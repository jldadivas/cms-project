import zipfile
import os
import re
import json
import xml.etree.ElementTree as ET

ppt_dir = r'c:\Users\Dadivas\Desktop\expo\public\presentations'
meta = [
    {
        'id': 'flutter',
        'lessonSlug': 'flutter-and-dart',
        'relatedSlugs': ['flutter-iot-application'],
        'title': 'Flutter & Dart Mobile Apps',
        'subtitle': 'Dart language, widget architecture, REST networking, fl_chart visualizations, and configurable IoT dashboards',
        'badge': 'Native UI Engine',
        'file': 'Flutter_(Dart)_Mobile_App_Development.pptx',
        'origName': 'Flutter (Dart) Mobile App Development.pptx',
    },
    {
        'id': 'ionic',
        'lessonSlug': 'ionic-framework',
        'relatedSlugs': ['ionic-capacitor-iot-app'],
        'title': 'Ionic Framework & Native Apps',
        'subtitle': 'Ionic React, Capacitor runtime bridge, Android packaging, and IoT dashboard implementation',
        'badge': 'Web-to-Native Stack',
        'file': 'Ionic_Framework_Development.pptx',
        'origName': 'Ionic Framework Development.pptx',
    },
    {
        'id': 'capacitor',
        'lessonSlug': 'capacitor-android',
        'relatedSlugs': [],
        'title': 'Capacitor Native Runtime',
        'subtitle': 'Bridging web applications to native platforms with custom plugin architecture and Android workflows',
        'badge': 'v4.0 Native Bridge',
        'file': 'Capacitor_Mobile_App_Development.pptx',
        'origName': 'Capacitor Mobile App Development.pptx',
    },
    {
        'id': 'vscode',
        'lessonSlug': 'vscode-setup',
        'relatedSlugs': [],
        'title': 'Visual Studio Code Workflows',
        'subtitle': 'Editor setup, framework extensions, integrated terminals, device debugging, and Git source control',
        'badge': 'Developer Workspace',
        'file': 'VS_Code_&_Development_Workflows.pptx',
        'origName': 'VS Code & Development Workflows.pptx',
    },
    {
        'id': 'android-studio',
        'lessonSlug': 'android-studio',
        'relatedSlugs': ['android-build-release'],
        'title': 'Android Studio & Native Builds',
        'subtitle': 'IDE setup, Android SDK management, Gradle build automation, emulators, and release packaging',
        'badge': 'Native Toolchain',
        'file': 'Android_Studio_&_Native_Builds.pptx',
        'origName': 'Android Studio & Native Builds.pptx',
    },
    {
        'id': 'realtime-iot',
        'lessonSlug': 'realtime-iot-monitoring',
        'relatedSlugs': ['display-sensor-data', 'sensor-graphs'],
        'title': 'Real-Time IoT Monitoring',
        'subtitle': 'Data freshness, reconnection resilience, polling vs. WebSockets, and data-quality states',
        'badge': 'Telemetry Standard',
        'file': 'Real-Time_IoT_Monitoring.pptx',
        'origName': 'Real-Time IoT Monitoring.pptx',
    },
    {
        'id': 'end-to-end',
        'lessonSlug': 'end-to-end-integration',
        'relatedSlugs': [],
        'title': 'End-to-End IoT Integration',
        'subtitle': 'ESP32 + Raspberry Pi + Mobile App full system validation, diagnostic boundaries, and security protocols',
        'badge': 'System Validation Stack',
        'file': 'End-to-End_IoT_Integration.pptx',
        'origName': 'End-to-End IoT Integration.pptx',
    },
]

presentations = []

for m in meta:
    fpath = os.path.join(ppt_dir, m['file'])
    size_kb = f"{os.path.getsize(fpath) // 1024} KB"
    with zipfile.ZipFile(fpath, 'r') as z:
        slide_files = [n for n in z.namelist() if re.match(r'ppt/slides/slide\d+\.xml', n)]
        slide_files.sort(key=lambda x: int(re.search(r'\d+', x).group()))
        slides = []
        for idx, sfile in enumerate(slide_files, start=1):
            content = z.read(sfile)
            root = ET.fromstring(content)
            texts = []
            for p in root.iter('{http://schemas.openxmlformats.org/drawingml/2006/main}p'):
                line = ''.join([t.text for t in p.iter('{http://schemas.openxmlformats.org/drawingml/2006/main}t') if t.text]).strip()
                if line:
                    texts.append(line)
            
            category = texts[0] if len(texts) > 0 else ''
            title = texts[1] if len(texts) > 1 else (texts[0] if texts else f'Slide {idx}')
            bullets = texts[2:] if len(texts) > 2 else []
            
            slides.append({
                'slideNumber': idx,
                'category': category,
                'title': title,
                'bullets': bullets,
            })
            
    presentations.append({
        'id': m['id'],
        'lessonSlug': m['lessonSlug'],
        'relatedSlugs': m['relatedSlugs'],
        'title': m['title'],
        'subtitle': m['subtitle'],
        'badge': m['badge'],
        'fileName': m['origName'],
        'downloadUrl': f"/presentations/{m['file']}",
        'fileSize': size_kb,
        'slideCount': len(slides),
        'slides': slides,
    })

ts_content = f"""// AUTO-GENERATED FROM COURSE PRESENTATION DECKS (PPTX)
// Mobile App Development - 7 Presentation Slide Decks

export interface PresentationSlide {{
  slideNumber: number
  category?: string
  title: string
  bullets: string[]
}}

export interface MobileAppPresentation {{
  id: string
  lessonSlug: string
  relatedSlugs: string[]
  title: string
  subtitle: string
  badge: string
  fileName: string
  downloadUrl: string
  fileSize: string
  slideCount: number
  slides: PresentationSlide[]
}}

export const mobileAppPresentations: MobileAppPresentation[] = {json.dumps(presentations, indent=2)}

export function getPresentationForLesson(slug: string): MobileAppPresentation | undefined {{
  return mobileAppPresentations.find(
    (p) => p.lessonSlug === slug || p.relatedSlugs.includes(slug)
  )
}}
"""

out_path = r'c:\Users\Dadivas\Desktop\expo\src\data\mobile-app-presentations.ts'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Generated {out_path} successfully!")

