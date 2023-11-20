// 3rd Party Imports
import moment from 'moment-timezone';
import React, {useCallback, useState} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import * as RNLocalize from 'react-native-localize';
// Local Imports
import {Icons} from '../../assets';
import CircleFilledIcon from '../CircleFilledIcon';
import styles from './styles';
import AppConstants from '../../constants/AppConstants';

const CustomDatePicker = ({
  label,
  minDate = '',
  maxDate = '',
  selectedDate = '',
  setDate,
  containerStyle,
  isEnable = true,
  isClock = false,
  Mode = 'datetime',
}) => {
  const [isOpen, setOpen] = useState(false);

  // Set Time Zone
  const getTimeZoneDate = (date, mode) => {
    if (mode === 'time') {
      date = moment(
        moment().format(AppConstants.DateFormats.Default) + ' ' + date,
        'YYYY-MM-DD HH:mm',
      );
    }

    const timeZone = RNLocalize.getTimeZone();
    const zoneDate = moment(date);
    return zoneDate.tz(timeZone).toDate();
  };

  // Handle selection Functionality
  const handleSelection = useCallback(() => setOpen(true), []);
  const onConfirm = useCallback(
    date => {
      setOpen(false);
      if (date) {
        setDate(date);
      }
    },
    [setDate],
  );

  // Handle Cancel functionality
  const handleCancel = useCallback(() => setOpen(false), []);

  // Date Change Functionality
  const handleDateChange = date => {
    setDate(date);
  };

  // Create StyleSheet Compose File and Use to Other Screen for Styling
  const datePickerContainer = StyleSheet.compose(styles.datePickerContainer, [
    containerStyle,
  ]);
  return (
    <>
      <Pressable style={datePickerContainer} onPress={handleSelection}>
        <Pressable style={styles.selectionContainer} onPress={handleSelection}>
          <Text style={styles.dateLabelText}>{label}</Text>
          <CircleFilledIcon
            icon={isClock ? Icons.clockIcn : Icons.CalendarIcn}
            containerStyle={styles.calendarIconContainer}
            iconStyle={styles.dateIcon}
          />
        </Pressable>
      </Pressable>
      {isOpen && isEnable && (
        <DatePicker
          mode={Mode}
          minimumDate={minDate ? getTimeZoneDate(minDate) : undefined}
          maximumDate={maxDate ? getTimeZoneDate(maxDate) : undefined}
          modal
          open={isOpen}
          date={selectedDate ? getTimeZoneDate(selectedDate, Mode) : new Date()}
          onConfirm={onConfirm}
          onCancel={handleCancel}
          onChange={handleDateChange}
        />
      )}
    </>
  );
};

export default CustomDatePicker;
