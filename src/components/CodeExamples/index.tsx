'use client'

import { useState } from 'react'
import { Check, Clipboard, Copy, ExternalLink } from 'lucide-react'
import { Highlight, themes } from 'prism-react-renderer'

export const codeExamples = [
  {
    id: 'esp32',
    title: 'ESP32 · MQTT + ToF + Light + Soil',
    language: 'cpp',
    explanation:
      'Uses dual I2C buses (Wire 0 on GPIO 21/22 for the Adafruit VL53L0X ToF distance sensor and Wire 1 on GPIO 18/19 for the BH1750 ambient light sensor), a capacitive/resistive soil moisture probe on GPIO 34 (ADC1), and publishes JSON to MQTT topic "esp32/tof_light_soil_data" on the Raspberry Pi broker every 5 seconds.',
    code: `#include <Wire.h>
#include <WiFi.h>
#include <PubSubClient.h>   // Library: "PubSubClient" by Nick O'Leary
#include <Adafruit_VL53L0X.h>
#include <BH1750.h>

// ================================
// CONFIGURATION
// ================================
const char* WIFI_SSID     = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

const char* MQTT_BROKER   = "YOUR_RASPBERRY_PI_IP";
const int   MQTT_PORT     = 1883;

// Different topics and client ID from other sketches
const char* MQTT_TOPIC        = "esp32/tof_light_soil_data";
const char* MQTT_STATUS_TOPIC = "esp32/tof_light_soil_status";  // online/offline (Last Will)
const char* MQTT_CLIENT_ID    = "esp32-tof-light-soil";

// Leave MQTT_USER as "" for anonymous access.
const char* MQTT_USER     = "";
const char* MQTT_PASS     = "";

const unsigned long PUBLISH_INTERVAL_MS = 5000;   // publish every 5 seconds
const unsigned long WIFI_RETRY_MS       = 10000;  // retry Wi-Fi every 10 s
const unsigned long MQTT_RETRY_MS       = 5000;   // retry MQTT every 5 s

// ================================
// SENSOR PINS & I2C BUSES
// ================================
#define TOF_SDA 21
#define TOF_SCL 22

#define LIGHT_SDA 18
#define LIGHT_SCL 19

#define SOIL_PIN 34   // ADC1 - safe to use with Wi-Fi

TwoWire tofWire = TwoWire(0);
TwoWire lightWire = TwoWire(1);

Adafruit_VL53L0X tof;
BH1750 lightMeter;

bool tofReady = false;
bool lightReady = false;

WiFiClient   wifiClient;
PubSubClient mqttClient(wifiClient);

unsigned long lastPublish = 0;
unsigned long lastWifiTry = 0;
unsigned long lastMqttTry = 0;

void connectWiFi() {
  Serial.print("Connecting to Wi-Fi: ");
  Serial.println(WIFI_SSID);

  WiFi.mode(WIFI_STA);
  WiFi.setAutoReconnect(true);
  WiFi.persistent(false);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 15000) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  if (WiFi.status() == WL_CONNECTED) {
    Serial.print("Wi-Fi connected. IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("Wi-Fi not connected yet, will keep retrying...");
  }
}

void maintainWiFi() {
  if (WiFi.status() == WL_CONNECTED) return;

  unsigned long now = millis();
  if (now - lastWifiTry >= WIFI_RETRY_MS) {
    lastWifiTry = now;
    Serial.println("Wi-Fi lost. Reconnecting...");
    WiFi.disconnect();
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  }
}

bool connectMQTT() {
  Serial.print("Connecting to MQTT broker ");
  Serial.print(MQTT_BROKER);
  Serial.print("... ");

  bool ok;
  if (strlen(MQTT_USER) > 0) {
    ok = mqttClient.connect(MQTT_CLIENT_ID, MQTT_USER, MQTT_PASS,
                            MQTT_STATUS_TOPIC, 1, true, "offline");
  } else {
    ok = mqttClient.connect(MQTT_CLIENT_ID, nullptr, nullptr,
                            MQTT_STATUS_TOPIC, 1, true, "offline");
  }

  if (ok) {
    Serial.println("connected.");
    mqttClient.publish(MQTT_STATUS_TOPIC, "online", true);
  } else {
    Serial.print("failed, rc=");
    Serial.println(mqttClient.state());
  }
  return ok;
}

void maintainMQTT() {
  if (WiFi.status() != WL_CONNECTED) return;
  if (mqttClient.connected()) return;

  unsigned long now = millis();
  if (now - lastMqttTry >= MQTT_RETRY_MS) {
    lastMqttTry = now;
    connectMQTT();
  }
}

void publishSensorData() {
  // 1. ToF distance
  char tofMmStr[16] = "null";
  char tofCmStr[16] = "null";

  if (tofReady) {
    VL53L0X_RangingMeasurementData_t measurement;
    tof.rangingTest(&measurement, false);

    if (measurement.RangeStatus != 4) {
      snprintf(tofMmStr, sizeof(tofMmStr), "%u", measurement.RangeMilliMeter);
      snprintf(tofCmStr, sizeof(tofCmStr), "%.1f", measurement.RangeMilliMeter / 10.0);
    }
  }

  // 2. BH1750 ambient light
  char luxStr[16] = "null";

  if (lightReady) {
    float lux = lightMeter.readLightLevel();
    if (lux >= 0) {
      snprintf(luxStr, sizeof(luxStr), "%.2f", lux);
    }
  }

  // 3. Soil moisture (raw ADC1)
  int soilValue = analogRead(SOIL_PIN);

  // Build JSON payload
  char payload[256];
  snprintf(payload, sizeof(payload),
           "{\"tof_mm\":%s,\"tof_cm\":%s,"
           "\"lux\":%s,"
           "\"soil_raw\":%d,"
           "\"rssi\":%d}",
           tofMmStr, tofCmStr,
           luxStr,
           soilValue,
           WiFi.RSSI());

  Serial.print("Publishing to ");
  Serial.print(MQTT_TOPIC);
  Serial.print(": ");
  Serial.println(payload);

  if (!mqttClient.publish(MQTT_TOPIC, payload)) {
    Serial.println("Publish failed.");
  }
}

void setup() {
  Serial.begin(115200);
  delay(1000);

  analogReadResolution(12);
  analogSetPinAttenuation(SOIL_PIN, ADC_11db);

  Serial.println();
  Serial.println("================================");
  Serial.println(" ESP32 SENSOR NODE - MQTT");
  Serial.println(" ToF | BH1750 | Soil Moisture");
  Serial.println("================================");

  // Initialize ToF I2C bus (Wire 0)
  if (tofWire.begin(TOF_SDA, TOF_SCL, 100000)) {
    Serial.println("ToF I2C bus initialized.");
    if (tof.begin(0x29, false, &tofWire)) {
      tofReady = true;
      Serial.println("ToF sensor: CONNECTED");
    } else {
      Serial.println("ToF sensor: NOT DETECTED");
    }
  }

  // Initialize BH1750 I2C bus (Wire 1)
  if (lightWire.begin(LIGHT_SDA, LIGHT_SCL, 100000)) {
    Serial.println("BH1750 I2C bus initialized.");
    if (lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE, 0x23, &lightWire)) {
      lightReady = true;
      Serial.println("BH1750: CONNECTED");
    } else {
      Serial.println("BH1750: NOT DETECTED");
    }
  }

  Serial.println("Soil moisture sensor: READY");
  connectWiFi();

  mqttClient.setServer(MQTT_BROKER, MQTT_PORT);
  mqttClient.setBufferSize(512);
  mqttClient.setKeepAlive(30);
}

void loop() {
  maintainWiFi();
  maintainMQTT();
  mqttClient.loop();

  unsigned long now = millis();
  if (now - lastPublish >= PUBLISH_INTERVAL_MS) {
    lastPublish = now;
    if (mqttClient.connected()) {
      publishSensorData();
    } else {
      Serial.println("MQTT offline, skipping publish.");
    }
  }
}`,
  },
  {
    id: 'fastapi',
    title: 'Raspberry Pi · FastAPI + MQTT Bridge (main.py)',
    language: 'python',
    explanation:
      'Async MQTT-to-HTTP bridge for the ESP32 sensor sketch. Subscribes to "esp32/tof_light_soil_data" and "esp32/tof_light_soil_status", computes calibrated soil moisture percentage from SOIL_DRY_RAW (2527) and SOIL_WET_RAW (1237), persists records to SQLite ("sensor_readings.sqlite3"), and serves REST endpoints: GET /api/readings/current (with /api/readings/latest alias), GET /api/readings, and GET /api/health.',
    code: `"""MQTT-to-HTTP bridge for the ESP32 sensor sketch."""
from __future__ import annotations

import json
import logging
import os
import sqlite3
import threading
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import paho.mqtt.client as mqtt
from dotenv import load_dotenv
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

logging.basicConfig(level=os.getenv("LOG_LEVEL", "INFO").upper(), format="%(asctime)s %(levelname)s %(name)s: %(message)s")
LOG = logging.getLogger("sensor_backend")
ROOT = Path(__file__).resolve().parent
load_dotenv(ROOT / ".env")
DB_PATH = Path(os.getenv("SENSOR_DB_PATH", str(ROOT / "sensor_readings.sqlite3")))
MQTT_HOST = os.getenv("MQTT_HOST", "127.0.0.1")
MQTT_PORT = int(os.getenv("MQTT_PORT", "1883"))
MQTT_USER = os.getenv("MQTT_USER", "")
MQTT_PASSWORD = os.getenv("MQTT_PASSWORD", "")
DATA_TOPIC = os.getenv("MQTT_DATA_TOPIC", "esp32/tof_light_soil_data")
STATUS_TOPIC = os.getenv("MQTT_STATUS_TOPIC", "esp32/tof_light_soil_status")
SOIL_DRY_RAW = os.getenv("SOIL_DRY_RAW", "").strip() or "2527"
SOIL_WET_RAW = os.getenv("SOIL_WET_RAW", "").strip() or "1237"

_db_lock = threading.Lock()
_mqtt_client: mqtt.Client | None = None
_mqtt_connected = threading.Event()
_last_mqtt_message: dict[str, str] = {}


def connect_db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH, timeout=10)
    conn.row_factory = sqlite3.Row
    return conn


def initialize_db() -> None:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with connect_db() as conn:
        conn.execute("""CREATE TABLE IF NOT EXISTS readings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            tof_distance_mm REAL,
            light_lux REAL,
            soil_raw INTEGER,
            soil_moisture_percent REAL,
            rssi INTEGER
        )""")


def finite_number(value: Any) -> float | None:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        return None
    value = float(value)
    return value if value >= 0 and value < float("inf") else None


def soil_percent(raw: int | None) -> float | None:
    if raw is None or SOIL_DRY_RAW is None or SOIL_WET_RAW is None:
        return None
    try:
        dry, wet = float(SOIL_DRY_RAW), float(SOIL_WET_RAW)
    except ValueError:
        LOG.error("SOIL_DRY_RAW and SOIL_WET_RAW must be numbers; soil percentage is unavailable")
        return None
    if dry == wet:
        LOG.error("SOIL_DRY_RAW and SOIL_WET_RAW must differ")
        return None
    return round(max(0.0, min(100.0, (raw - dry) * 100.0 / (wet - dry))), 1)


def store_reading(payload: dict[str, Any]) -> None:
    tof = finite_number(payload.get("tof_mm"))
    lux = finite_number(payload.get("lux"))
    raw_value = payload.get("soil_raw")
    raw = raw_value if isinstance(raw_value, int) and not isinstance(raw_value, bool) and raw_value >= 0 else None
    rssi_value = payload.get("rssi")
    rssi = rssi_value if isinstance(rssi_value, int) and not isinstance(rssi_value, bool) else None
    # Ignore malformed or unrelated MQTT messages instead of recording empty rows.
    if tof is None and lux is None and raw is None:
        LOG.warning("Ignoring MQTT payload with no valid sensor values")
        return
    timestamp = datetime.now(timezone.utc).isoformat(timespec="milliseconds").replace("+00:00", "Z")
    with _db_lock, connect_db() as conn:
        conn.execute(
            "INSERT INTO readings(timestamp,tof_distance_mm,light_lux,soil_raw,soil_moisture_percent,rssi) VALUES(?,?,?,?,?,?)",
            (timestamp, tof, lux, raw, soil_percent(raw), rssi),
        )
    LOG.info("Saved sensor reading: tof_mm=%s lux=%s soil_raw=%s rssi=%s", tof, lux, raw, rssi)


def on_connect(client: mqtt.Client, _userdata: Any, _flags: Any, reason_code: Any, _properties: Any = None) -> None:
    if reason_code == 0:
        _mqtt_connected.set()
        LOG.info("Connected to MQTT broker at %s:%s", MQTT_HOST, MQTT_PORT)
        result, _mid = client.subscribe([(DATA_TOPIC, 0), (STATUS_TOPIC, 1)])
        LOG.info("Subscribed to %s and %s (result=%s)", DATA_TOPIC, STATUS_TOPIC, result)
    else:
        _mqtt_connected.clear()
        LOG.error("MQTT connection failed: %s", reason_code)


def on_disconnect(_client: mqtt.Client, _userdata: Any, _disconnect_flags: Any, reason_code: Any, _properties: Any = None) -> None:
    _mqtt_connected.clear()
    LOG.warning("Disconnected from MQTT broker (reason=%s); reconnect will be attempted", reason_code)


def on_message(_client: mqtt.Client, _userdata: Any, msg: mqtt.MQTTMessage) -> None:
    try:
        decoded = msg.payload.decode("utf-8")
        received_at = datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")
        _last_mqtt_message.update(topic=msg.topic, received_at=received_at)
        LOG.info("Received MQTT message on %s (%d bytes)", msg.topic, len(msg.payload))
        if msg.topic == STATUS_TOPIC:
            LOG.info("ESP32 status: %s", decoded)
            return
        store_reading(json.loads(decoded))
    except (UnicodeDecodeError, json.JSONDecodeError, TypeError) as exc:
        LOG.warning("Ignoring invalid MQTT message on %s: %s", msg.topic, exc)


@asynccontextmanager
async def lifespan(_app: FastAPI):
    global _mqtt_client
    initialize_db()
    client_id = os.getenv("MQTT_CLIENT_ID", "ut-cms-python-backend")
    _mqtt_client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, client_id=client_id)
    if MQTT_USER:
        _mqtt_client.username_pw_set(MQTT_USER, MQTT_PASSWORD)
    _mqtt_client.on_connect = on_connect
    _mqtt_client.on_disconnect = on_disconnect
    _mqtt_client.on_message = on_message
    _mqtt_client.reconnect_delay_set(min_delay=1, max_delay=30)
    try:
        LOG.info("Starting sensor API on port 8080; broker=%s:%s data_topic=%s", MQTT_HOST, MQTT_PORT, DATA_TOPIC)
        _mqtt_client.connect_async(MQTT_HOST, MQTT_PORT, keepalive=30)
        _mqtt_client.loop_start()
    except Exception:
        LOG.exception("Could not start MQTT connection")
    yield
    if _mqtt_client:
        _mqtt_client.loop_stop()
        _mqtt_client.disconnect()


app = FastAPI(title="UT-CMS Sensor API", lifespan=lifespan)
origins = [origin.strip() for origin in os.getenv("CORS_ORIGINS", "*").split(",") if origin.strip()]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["GET"], allow_headers=["*"])


def api_reading(row: sqlite3.Row) -> dict[str, Any]:
    return {
        "timestamp": row["timestamp"],
        "tof_distance_mm": row["tof_distance_mm"],
        "light_lux": row["light_lux"],
        "soil_raw": row["soil_raw"],
        "soil_moisture_percent": row["soil_moisture_percent"],
        "rssi": row["rssi"],
    }


@app.get("/api/readings/current")
@app.get("/api/readings/latest")
def current_reading() -> dict[str, Any]:
    with connect_db() as conn:
        row = conn.execute("SELECT * FROM readings ORDER BY id DESC LIMIT 1").fetchone()
    return {"reading": api_reading(row) if row else None}


@app.get("/api/readings")
def reading_history(limit: int = Query(default=500, ge=1, le=5000)) -> dict[str, list[dict[str, Any]]]:
    with connect_db() as conn:
        rows = conn.execute("SELECT * FROM readings ORDER BY id DESC LIMIT ?", (limit,)).fetchall()
    return {"readings": [api_reading(row) for row in rows]}


@app.get("/api/health")
def health() -> dict[str, Any]:
    with connect_db() as conn:
        count = conn.execute("SELECT COUNT(*) FROM readings").fetchone()[0]
    return {
        "status": "ok",
        "mqtt_connected": _mqtt_connected.is_set(),
        "mqtt_broker": f"{MQTT_HOST}:{MQTT_PORT}",
        "mqtt_data_topic": DATA_TOPIC,
        "mqtt_status_topic": STATUS_TOPIC,
        "last_mqtt_message": _last_mqtt_message or None,
        "stored_readings": count,
    }`,
  },
  {
    id: 'expo',
    title: 'Expo Go · Dashboard Screen (index.tsx)',
    language: 'tsx',
    explanation:
      'Live dashboard screen for Expo Go mobile monitoring. Uses useSensors() and fetchCurrent() to poll your Raspberry Pi API (port 8080), displays real-time connection status with stale timestamp detection, and renders SensorCards for ToF distance (mm), ambient light (lx), and calibrated soil moisture (%) with customizable thresholds.',
    code: `import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Button, C, Header, Page, Panel, SensorCard, s } from '@/components/sensor-ui';
import { fetchCurrent, useSensors } from '@/lib/sensors';

export default function Dashboard() {
  const { reading, records, connected, loading, error, updatedAt, settings } = useSensors();

  useEffect(() => {
    fetchCurrent();
    const timer = setInterval(fetchCurrent, Math.max(5, settings.interval) * 1000);
    return () => clearInterval(timer);
  }, [settings.baseUrl, settings.port, settings.interval]);

  const d = reading?.tof_distance_mm;
  const l = reading?.light_lux;
  const m = reading?.soil_moisture_percent;

  const isStale = !!updatedAt && Date.now() - Date.parse(updatedAt) > Math.max(15, settings.interval * 3) * 1000;
  const tofStatus = d == null ? 'No reading' : d < settings.tofMin || d > settings.tofMax ? 'Out of range' : 'Normal';
  const lightStatus = l == null ? 'No reading' : l < settings.lightLow ? 'Dark' : l > settings.lightHigh ? 'Bright' : 'Normal';
  const soilStatus = m == null ? 'No reading' : m < settings.soilDry ? 'Dry' : m > settings.soilWet ? 'Wet' : 'Normal';

  return (
    <Page>
      <Header
        eyebrow="IoT sensor monitoring system"
        title="Dashboard"
        detail="Live conditions from your sensor network."
      />
      <View style={{ alignItems: 'flex-start', marginTop: -10, marginBottom: 14 }}>
        <Button
          label={loading ? 'Refreshing…' : '↻ Refresh readings'}
          onPress={fetchCurrent}
          disabled={loading}
        />
      </View>

      <Panel style={{ marginBottom: 16, backgroundColor: connected && !isStale ? '#EAF4ED' : C.card }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontWeight: '700', color: C.ink }}>Raspberry Pi connection</Text>
          <Text style={{ color: connected && !isStale ? C.green : C.orange, fontSize: 12, fontWeight: '800' }}>
            ● {connected ? (isStale ? 'STALE DATA' : 'CONNECTED') : 'DISCONNECTED'}
          </Text>
        </View>
        <Text style={[s.muted, { marginTop: 7 }]}>
          {updatedAt ? \`Last update · \${new Date(updatedAt).toLocaleString()}\` : 'Waiting for a valid server reading'}
        </Text>
        {isStale ? (
          <Text style={{ color: C.orange, fontSize: 12, marginTop: 5 }}>
            The latest timestamp is older than three refresh intervals.
          </Text>
        ) : null}
      </Panel>

      {loading && !reading && <ActivityIndicator color={C.green} style={{ marginVertical: 12 }} />}
      {error ? (
        <Panel style={{ marginBottom: 14, borderColor: '#E9C8C1' }}>
          <Text style={{ color: C.red, fontWeight: '700', marginBottom: 4 }}>Unable to retrieve sensor data</Text>
          <Text style={s.muted}>{error}</Text>
        </Panel>
      ) : null}

      <SensorCard
        type="TOF distance"
        value={d}
        unit="mm"
        status={tofStatus}
        note={d == null ? 'No valid measurement received' : \`Allowed range \${settings.tofMin}–\${settings.tofMax} mm\`}
        color={tofStatus === 'Out of range' ? C.orange : C.green}
      />
      <SensorCard
        type="Light intensity"
        value={l}
        unit="lx"
        status={lightStatus}
        note={l == null ? 'Lux is shown only when the API provides calibrated lux' : \`Low \${settings.lightLow} lx · high \${settings.lightHigh} lx\`}
        color={lightStatus === 'Dark' || lightStatus === 'Bright' ? C.orange : C.blue}
      />
      <SensorCard
        type="Soil moisture"
        value={m}
        unit="%"
        status={soilStatus}
        note={m == null ? 'No valid measurement received' : \`Desired range \${settings.soilTargetMin}–\${settings.soilTargetMax}%\`}
        color={soilStatus === 'Dry' || soilStatus === 'Wet' ? C.orange : C.green}
        progress={m}
      />

      <Text style={[s.muted, { textAlign: 'center', marginTop: 4 }]}>
        {records.length ? \`\${records.length} readings available in this session\` : 'Historical readings will appear when provided by your API.'}
      </Text>
    </Page>
  );
}`,
  },
] as const

export type CodeExampleId = (typeof codeExamples)[number]['id']

export function CodeExamples({ only }: { only?: readonly CodeExampleId[] }) {
  const [copied, setCopied] = useState<string | null>(null)
  const [copyError, setCopyError] = useState<string | null>(null)
  const visibleExamples = only
    ? codeExamples.filter((example) => only.includes(example.id))
    : codeExamples

  async function copyCode(id: string, code: string) {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard access is not available in this browser.')
      }
      await navigator.clipboard.writeText(code)
      setCopied(id)
      setCopyError(null)
      window.setTimeout(() => setCopied((current) => (current === id ? null : current)), 1800)
    } catch (error) {
      setCopyError(
        error instanceof Error
          ? `${error.message} Select the code and copy it manually.`
          : `Could not copy ${id}; select the code and copy it manually.`,
      )
    }
  }

  return (
    <div className="mt-8 space-y-7">
      {visibleExamples.map((example) => (
        <article
          className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#091524] shadow-2xl backdrop-blur-xl"
          id={example.id}
          key={example.id}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] bg-[#07111e] px-4 py-3.5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-rose-500/80" />
                <span className="size-2.5 rounded-full bg-amber-500/80" />
                <span className="size-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="rounded bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-cyan-300 border border-white/10">
                {example.language}
              </span>
              <h2 className="text-sm font-bold text-white sm:text-base">{example.title}</h2>
            </div>
            <button
              className="inline-flex min-h-9 shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-3.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-400/50 hover:bg-white/[0.08] hover:text-white"
              onClick={() => void copyCode(example.id, example.code)}
              type="button"
            >
              {copied === example.id ? (
                <Check aria-hidden="true" className="size-3.5 text-emerald-300" />
              ) : copyError?.includes(example.id) ? (
                <ExternalLink aria-hidden="true" className="size-3.5 text-amber-300" />
              ) : (
                <Copy aria-hidden="true" className="size-3.5 text-cyan-300" />
              )}
              {copied === example.id ? 'Copied to Clipboard' : 'Copy'}
            </button>
          </div>
          <div className="border-b border-white/[0.06] bg-[#071322]/50 px-4 py-2.5 sm:px-6">
            <p className="text-xs leading-relaxed text-slate-400">{example.explanation}</p>
          </div>
          <Highlight code={example.code} language={example.language} theme={themes.vsDark}>
            {({ getLineProps, getTokenProps, tokens }) => (
              <pre className="max-h-[34rem] overflow-auto bg-[#050c14] p-4 text-xs font-mono leading-6 sm:p-6 sm:text-sm">
                {tokens.map((line, lineIndex) => (
                  <div key={lineIndex} {...getLineProps({ className: 'table-row', line })}>
                    <span className="table-cell select-none pr-5 text-right text-slate-600">
                      {lineIndex + 1}
                    </span>
                    <span className="table-cell">
                      {line.map((token, tokenIndex) => (
                        <span key={tokenIndex} {...getTokenProps({ token })} />
                      ))}
                    </span>
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </article>
      ))}
      {copyError && (
        <p
          aria-live="polite"
          className="flex items-center gap-2 text-xs text-amber-200"
          role="status"
        >
          <Clipboard aria-hidden="true" className="size-3.5" />
          {copyError}
        </p>
      )}
    </div>
  )
}
