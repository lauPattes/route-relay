import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  openTestRoute,
  type SupportedMimeType,
  supportedMimeTypes,
} from './src/android/openGpx';
import { testRoute } from './src/gpx/sample';

export default function App() {
  const [selectedMimeType, setSelectedMimeType] = useState<SupportedMimeType>(
    supportedMimeTypes[0],
  );
  const [isOpening, setIsOpening] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleOpenRoute() {
    if (Platform.OS !== 'android') {
      setMessage('This experiment currently supports Android only.');
      return;
    }

    setIsOpening(true);
    setMessage(null);

    try {
      await openTestRoute(selectedMimeType);
      setMessage(
        'Android returned to Route Relay. Record what Garmin Connect displayed.',
      );
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'Unknown error';
      setMessage(`Android could not open the GPX file: ${detail}`);
    } finally {
      setIsOpening(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.eyebrowRow}>
          <View style={styles.dot} />
          <Text style={styles.eyebrow}>ANDROID HANDOFF EXPERIMENT</Text>
        </View>

        <Text style={styles.title}>Route Relay</Text>
        <Text style={styles.introduction}>
          Test whether Garmin Connect can open a clean GPX track created by this
          app.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>TEST ROUTE</Text>
          <Text style={styles.routeName}>{testRoute.name}</Text>

          <View style={styles.summaryRow}>
            <SummaryItem label="Distance" value={testRoute.distance} />
            <View style={styles.divider} />
            <SummaryItem
              label="Route points"
              value={String(testRoute.pointCount)}
            />
            <View style={styles.divider} />
            <SummaryItem label="Status" value="Valid" accent />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>File type sent to Android</Text>
          <Text style={styles.helpText}>
            Start with the first option. If Garmin is missing or rejects the
            file, return here and try the next one.
          </Text>

          <View style={styles.optionList}>
            {supportedMimeTypes.map((mimeType) => {
              const selected = mimeType === selectedMimeType;

              return (
                <Pressable
                  accessibilityRole="radio"
                  accessibilityState={{ checked: selected }}
                  key={mimeType}
                  onPress={() => setSelectedMimeType(mimeType)}
                  style={[styles.option, selected && styles.optionSelected]}
                >
                  <View
                    style={[
                      styles.radio,
                      selected && styles.radioSelected,
                    ]}
                  >
                    {selected ? <View style={styles.radioCentre} /> : null}
                  </View>
                  <Text
                    style={[
                      styles.optionText,
                      selected && styles.optionTextSelected,
                    ]}
                  >
                    {mimeType}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          disabled={isOpening}
          onPress={handleOpenRoute}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
            isOpening && styles.primaryButtonDisabled,
          ]}
        >
          {isOpening ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.primaryButtonText}>Open test GPX</Text>
          )}
        </Pressable>

        <Text style={styles.footnote}>
          Android should show apps registered to open this file. Choose Garmin
          Connect if it appears.
        </Text>

        {message ? (
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

type SummaryItemProps = {
  accent?: boolean;
  label: string;
  value: string;
};

function SummaryItem({ accent = false, label, value }: SummaryItemProps) {
  return (
    <View style={styles.summaryItem}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={[styles.summaryValue, accent && styles.summaryValueAccent]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f6f1',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 40,
  },
  eyebrowRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  dot: {
    backgroundColor: '#e86f3c',
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  eyebrow: {
    color: '#546259',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  title: {
    color: '#18342a',
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -1.2,
  },
  introduction: {
    color: '#546259',
    fontSize: 17,
    lineHeight: 25,
    marginTop: 10,
    maxWidth: 520,
  },
  card: {
    backgroundColor: '#ffffff',
    borderColor: '#dce4dc',
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 30,
    padding: 20,
  },
  cardLabel: {
    color: '#77837b',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  routeName: {
    color: '#18342a',
    fontSize: 23,
    fontWeight: '700',
    marginTop: 7,
  },
  summaryRow: {
    alignItems: 'stretch',
    flexDirection: 'row',
    marginTop: 22,
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    color: '#7c8880',
    fontSize: 11,
    marginBottom: 5,
  },
  summaryValue: {
    color: '#263e35',
    fontSize: 15,
    fontWeight: '700',
  },
  summaryValueAccent: {
    color: '#27744f',
  },
  divider: {
    backgroundColor: '#e5ebe5',
    marginHorizontal: 12,
    width: 1,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    color: '#18342a',
    fontSize: 18,
    fontWeight: '700',
  },
  helpText: {
    color: '#66736b',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 7,
  },
  optionList: {
    gap: 10,
    marginTop: 16,
  },
  option: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#dce4dc',
    borderRadius: 13,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 13,
  },
  optionSelected: {
    backgroundColor: '#e8f2eb',
    borderColor: '#2d6a4f',
  },
  radio: {
    alignItems: 'center',
    borderColor: '#9aa69e',
    borderRadius: 9,
    borderWidth: 1.5,
    height: 18,
    justifyContent: 'center',
    marginRight: 12,
    width: 18,
  },
  radioSelected: {
    borderColor: '#2d6a4f',
  },
  radioCentre: {
    backgroundColor: '#2d6a4f',
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  optionText: {
    color: '#4b5a51',
    fontSize: 14,
  },
  optionTextSelected: {
    color: '#18342a',
    fontWeight: '600',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#e86f3c',
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: 30,
    minHeight: 56,
    paddingHorizontal: 20,
  },
  primaryButtonPressed: {
    backgroundColor: '#cd582b',
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  footnote: {
    color: '#728078',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 13,
    textAlign: 'center',
  },
  messageBox: {
    backgroundColor: '#fff7e8',
    borderColor: '#edd8ae',
    borderRadius: 13,
    borderWidth: 1,
    marginTop: 18,
    padding: 14,
  },
  messageText: {
    color: '#654f24',
    fontSize: 14,
    lineHeight: 20,
  },
});
