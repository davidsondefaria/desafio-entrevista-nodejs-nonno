import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, View, Text, Image, Button } from 'react-native';

import { IAuctionData } from './AuctionScreen';
import ControlledTextInput from '../components/ControlledTextInput';

const AuctionDetailsModal = ({ isVisible, auction, onClose, onSubmitBid }: IAuctionDetailsForm) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBidForm>({
    defaultValues: {
      bidAmount: `${auction.currentBid}`,
    },
  });

  const onSubmit = async (data: IBidForm) => {
    setLoading(true);

    try {
      onSubmitBid(data.bidAmount);
    } catch (error) {
      console.error('Erro no lance', error);
    } finally {
      setLoading(false);
      navigation.navigate('TabNavigator' as never);
      reset();
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Modal animationType="slide" visible={isVisible}>
        <Image source={{ uri: auction.imageUrl }} style={{ width: 200, height: 200 }} />
        <Text>Marca: {auction.brand}</Text>
        <Text>Modelo: {auction.model}</Text>
        <Text>Lance inicial: ${auction.startingBid}</Text>
        <Text>Lance atual: ${auction.currentBid}</Text>
        <Text>Fim dos lances: {auction.auctionEndDate.toLocaleDateString()}</Text>
        <ControlledTextInput
          control={control}
          name="bidAmount"
          placeholder="Dê seu lance"
          keyboardType="numeric"
          inputMode="numeric"
          rules={{
            validate: (value: string) =>
              Number(value) > auction.currentBid || 'Seu lance deve ser maior que o atual',
          }}
        />
        <Button
          title="Fazer o lance"
          onPress={handleSubmit(onSubmit)}
          disabled={!!errors.bidAmount}
        />
        <Button title="Fechar" onPress={onClose} />
      </Modal>
    </View>
  );
};

export default AuctionDetailsModal;

interface IBidForm {
  bidAmount: string;
}

interface IAuctionDetailsForm {
  isVisible: boolean;
  auction: IAuctionData;
  onClose: any;
  onSubmitBid: any; //TODO arrumar esses types
}
