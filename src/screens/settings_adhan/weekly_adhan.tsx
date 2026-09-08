import {i18n} from '@lingui/core';
import {t} from '@lingui/macro';
import {produce} from 'immer';
import {
  FormControl,
  HStack,
  ScrollView,
  Stack,
  Switch,
  Text,
} from 'native-base';
import {useCallback, useMemo} from 'react';
import {useStore} from 'zustand';
import {shallow} from 'zustand/shallow';
import {AudioPicker} from '@/components/audio_picker';
import {SafeArea} from '@/components/safe_area';
import {WeekDaysInOrder} from '@/components/week_day_selector';
import {AudioEntry} from '@/modules/media_player';
import {adhanEntryTranslations} from '@/assets/adhan_entries';
import {settings, useSettings} from '@/store/settings';
import {WeekDayIndex, WeekDays, WeekDayName} from '@/utils/date';

function WeekdayAdhanRow({weekday}: {weekday: WeekDayIndex}) {
  const {entry, setWeeklyAdhanEntry} = useStore(
    settings,
    s => ({
      entry: s.WEEKLY_ADHAN_ENTRIES[weekday],
      setWeeklyAdhanEntry: s.setWeeklyAdhanEntry,
    }),
    shallow,
  );

  const onAudioSelected = useCallback(
    (item: AudioEntry) => setWeeklyAdhanEntry(weekday, item),
    [weekday, setWeeklyAdhanEntry],
  );

  const translatedSelectedItem = useMemo(() => {
    if (entry) {
      return produce(entry, (e: any) => {
        if (e.internal) {
          e.label = i18n._(adhanEntryTranslations[e.id]);
        }
        (e as any).a = true;
      });
    }
    return undefined;
  }, [entry]);

  const dayName = WeekDays[weekday] as WeekDayName;

  return (
    <HStack alignItems="center" mb="2">
      <FormControl>
        <FormControl.Label>
          {i18n._(WeekDaysInOrder[dayName])}
        </FormControl.Label>
        <AudioPicker
          actionsheetLabel={t({
            id: 'muezzin_settings',
            message: 'Muezzin',
          })}
          onItemSelected={onAudioSelected}
          autoCompleteKeys={['label']}
          selectedItem={translatedSelectedItem as AudioEntry | undefined}
          placeholder={t`Uses default Fajr adhan`}
          size="sm"
          height="10"
          adhan
        />
      </FormControl>
    </HStack>
  );
}

const weekdaysInDisplayOrder: WeekDayIndex[] = [0, 1, 2, 3, 4, 5, 6];

export function WeeklyAdhanSettings() {
  const [enabled, setEnabled] = useSettings('WEEKLY_ADHAN_ENABLED');

  const onToggle = useCallback(
    (value: boolean) => setEnabled(value),
    [setEnabled],
  );

  return (
    <SafeArea>
      <ScrollView>
        <Stack flex={1} px="4" py="4">
          <HStack justifyContent="space-between" alignItems="center" mb="3">
            <Stack flexShrink={1} pr="2">
              <Text fontSize="md" fontWeight="bold">
                {t`Different adhan every day`}
              </Text>
              <Text fontSize="xs" color="coolGray.500">
                {t`Assign a different Fajr adhan to each day of the week. Days left unset use your default Fajr adhan.`}
              </Text>
            </Stack>
            <Switch value={!!enabled} onToggle={onToggle} size="lg" />
          </HStack>

          {enabled &&
            weekdaysInDisplayOrder.map(weekday => (
              <WeekdayAdhanRow weekday={weekday} key={weekday} />
            ))}
        </Stack>
      </ScrollView>
    </SafeArea>
  );
}
