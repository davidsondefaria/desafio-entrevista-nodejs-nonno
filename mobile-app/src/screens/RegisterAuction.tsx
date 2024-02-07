import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, Button, Image } from 'react-native';

import { IAuctionData } from './AuctionScreen';
import ControlledTextInput from '../components/ControlledTextInput';
import DatePickerModal from '../components/DatePicker';

const RegisterAuction = ({ navigation }: IRegisterAuction) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterAuctionForm>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleOpenDatePicker = () => {
    setIsDatePickerOpen(true);
  };

  const handleDateChange = (newDate: any) => {
    setSelectedDate(newDate);
    setIsDatePickerOpen(false);
  };

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <View>
      <Text>Registrar carro para leilão</Text>
      <ControlledTextInput
        control={control}
        name="brand"
        placeholder="Marca"
        rules={{ required: 'Marca é obrigatório!' }}
      />
      {errors.brand && <Text style={{ color: 'red' }}>{errors.brand.message}</Text>}
      <ControlledTextInput
        control={control}
        name="model"
        placeholder="Modelo"
        rules={{ required: 'Modelo é obrigatório!' }}
      />
      {errors.model && <Text style={{ color: 'red' }}>{errors.model.message}</Text>}
      <ControlledTextInput
        control={control}
        name="year"
        placeholder="Ano"
        keyboardType="numeric"
        rules={{
          required: 'Ano é obrigatório',
          min: 1900,
          max: new Date().getFullYear(),
        }}
      />
      {errors.year && <Text style={{ color: 'red' }}>{errors.year.message}</Text>}
      <Button title="Selecione o fim do leilão" onPress={handleOpenDatePicker} />
      <DatePickerModal isOpen={isDatePickerOpen} onDateChange={handleDateChange} />
      <Text>Data selecionada: {selectedDate?.toLocaleDateString()}</Text>
      <Button
        title="Registrar Carro"
        onPress={handleSubmit(onSubmit)}
        disabled={Object.keys(errors).length > 0}
      />
    </View>
  );
};

export default RegisterAuction;

interface IRegisterAuction {
  navigation: any;
}

interface IRegisterAuctionForm extends Omit<IAuctionData, 'id' | 'currentBit'> {}
