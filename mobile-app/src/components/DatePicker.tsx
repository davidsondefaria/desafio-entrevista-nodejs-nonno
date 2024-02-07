import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Modal, View } from 'react-native';

const DatePickerModal = ({ isOpen, onDateChange }: IDatePickerModal) => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Track selected date

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
    onDateChange(newDate);
  };

  return (
    <Modal animationType="slide" transparent visible={isOpen}>
      <View style={{ margin: 20 }}>
        <DateTimePicker
          value={selectedDate}
          mode="date"
          onChange={({ nativeEvent: { timestamp } }) => {
            handleDateChange(new Date(timestamp));
          }}
        />
      </View>
    </Modal>
  );
};

export default DatePickerModal;

interface IDatePickerModal {
  isOpen: boolean;
  onDateChange: any;
}
