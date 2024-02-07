import { useEffect, useState } from 'react';
import { Button, Image, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import AuctionDetailsModal from './AuctionDetailsModal';

const AuctionScreen = () => {
  const [auctions, setAuctions] = useState<IAuctionData[]>([]);
  const [selectedAuction, setSelectedAuction] = useState<IAuctionData | null>(null); // State to store selected auction

  useEffect(() => {
    const fetchAuctions = () => {
      const response = { data: AUCTION_DATA };
      setAuctions(response.data);
    };
    fetchAuctions();
  }, []);

  return (
    <View>
      <Text>Auctions List</Text>
      <FlatList
        data={auctions}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.imageUrl }} style={{ width: 100, height: 100 }} />
            <Text>
              {item.brand} {item.model}
            </Text>
            <Text>Lance inicial: ${item.startingBid}</Text>
            <Text>Lance atual: ${item.currentBid}</Text>
            <Text>Fim dos lances: {item.auctionEndDate.toLocaleDateString()}</Text>
            <Button
              title="Ver detalhes"
              onPress={() => {
                setSelectedAuction(item);
              }}
            />
          </View>
        )}
      />
      {!!selectedAuction && (
        <AuctionDetailsModal
          isVisible={!!selectedAuction}
          auction={selectedAuction as IAuctionData}
          onClose={() => setSelectedAuction(null)}
          onSubmitBid={(bidAmount: number) => {
            console.log('lance realizado', bidAmount);
          }}
        />
      )}
    </View>
  );
};

export default AuctionScreen;

const styles = {
  container: 'items-center flex-1 justify-center',
  separator: 'h-[1px] my-7 w-4/5 bg-gray-200',
  title: 'text-xl font-bold',
};

const AUCTION_DATA: IAuctionData[] = [
  {
    id: '1',
    brand: 'Ford',
    model: 'Mustang GT',
    startingBid: 30000,
    currentBid: 32500,
    auctionEndDate: new Date('2024-02-20'),
    imageUrl: 'https://live.staticflickr.com/65535/53085261020_6b807d5652_b.jpg',
    year: 2024,
  },
  {
    id: '2',
    brand: 'Toyota',
    model: 'Camry Hybrid',
    startingBid: 25000,
    currentBid: 27000,
    auctionEndDate: new Date('2024-02-23'),
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/c/cf/Camry_Hybrid_2012_07_VA_4105.JPG',
    year: 2012,
  },
];

export interface IAuctionData {
  id: string;
  brand: string;
  model: string;
  startingBid: number;
  currentBid: number;
  auctionEndDate: Date;
  imageUrl: string;
  year: number;
}
