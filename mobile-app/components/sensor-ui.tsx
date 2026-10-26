import React from 'react'
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native'

export const C = {
  bg: '#f8fafc',
  card: '#ffffff',
  cardBorder: '#e2e8f0',
  ink: '#0f172a',
  muted: '#64748b',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
  blue: '#0284c7',
}

export const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.bg,
  },
  content: {
    padding: 18,
    paddingTop: 28,
    paddingBottom: 40,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  muted: {
    color: C.muted,
    fontSize: 13,
    lineHeight: 18,
  },
})

export function Page({
  children,
  style,
}: {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}) {
  return (
    <SafeAreaView style={[s.safeArea, style]}>
      <ScrollView contentContainerStyle={s.content}>{children}</ScrollView>
    </SafeAreaView>
  )
}

export function Header({
  eyebrow,
  title,
  detail,
}: {
  eyebrow?: string
  title: string
  detail?: string
}) {
  return (
    <View style={headerStyles.container}>
      {eyebrow ? <Text style={headerStyles.eyebrow}>{eyebrow.toUpperCase()}</Text> : null}
      <Text style={headerStyles.title}>{title}</Text>
      {detail ? <Text style={headerStyles.detail}>{detail}</Text> : null}
    </View>
  )
}

const headerStyles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  eyebrow: {
    color: C.blue,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  title: {
    color: C.ink,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  detail: {
    color: C.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
})

export function Panel({
  children,
  style,
}: {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}) {
  return <View style={[panelStyles.panel, style]}>{children}</View>
}

const panelStyles = StyleSheet.create({
  panel: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.cardBorder,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
})

export function Button({
  label,
  onPress,
  disabled,
  style,
}: {
  label: string
  onPress: () => void
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        btnStyles.button,
        pressed && btnStyles.pressed,
        disabled && btnStyles.disabled,
        style,
      ]}
    >
      <Text style={btnStyles.label}>{label}</Text>
    </Pressable>
  )
}

const btnStyles = StyleSheet.create({
  button: {
    backgroundColor: C.ink,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
})

export function SensorCard({
  type,
  value,
  unit,
  status,
  note,
  color,
  progress,
}: {
  type: string
  value: number | null | undefined
  unit: string
  status: string
  note: string
  color: string
  progress?: number | null | undefined
}) {
  return (
    <View style={cardStyles.card}>
      <View style={cardStyles.topRow}>
        <Text style={cardStyles.type}>{type}</Text>
        <View style={[cardStyles.badge, { backgroundColor: color + '20' }]}>
          <Text style={[cardStyles.badgeText, { color }]}>{status}</Text>
        </View>
      </View>
      <View style={cardStyles.valueRow}>
        <Text style={cardStyles.value}>
          {value != null ? (Number.isInteger(value) ? value : value.toFixed(1)) : '—'}
        </Text>
        <Text style={cardStyles.unit}> {unit}</Text>
      </View>
      {progress != null && !isNaN(progress) ? (
        <View style={cardStyles.progressTrack}>
          <View
            style={[
              cardStyles.progressBar,
              {
                width: `${Math.max(0, Math.min(100, progress))}%`,
                backgroundColor: color,
              },
            ]}
          />
        </View>
      ) : null}
      <Text style={cardStyles.note}>{note}</Text>
    </View>
  )
}

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.cardBorder,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  type: {
    fontSize: 14,
    fontWeight: '700',
    color: C.ink,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  value: {
    fontSize: 32,
    fontWeight: '800',
    color: C.ink,
  },
  unit: {
    fontSize: 15,
    fontWeight: '600',
    color: C.muted,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e2e8f0',
    overflow: 'hidden',
    marginVertical: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  note: {
    fontSize: 12,
    color: C.muted,
    lineHeight: 16,
    marginTop: 4,
  },
})
