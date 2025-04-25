import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';

import ChroniclesInformationScreen from './ChroniclesInformationScreen';
import ChroniclesFactsScreen from './ChroniclesFactsScreen';
import ChroniclesMyCatchesScreen from './ChroniclesMyCatchesScreen';
import ChroniclesAquariumScreen from './ChroniclesAquariumScreen';


const fontRubikRegular = 'Rubik-Regular';


const ChroniclesHomeFishingScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedTimeChroniclesPage, setSelectedTimeChroniclesPage] = useState('Home');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#002357',
        height: dimensions.height,
      }}>
        {selectedTimeChroniclesPage === 'Home' ? (
          <SafeAreaView style={{
            flex: 1,
            alignItems: 'center',
          }}>
            <Image
              source={require('../assets/images/homeFisherImage.png')}
              style={{
                width: dimensions.width * 0.9,
                height: dimensions.height * 0.28,
                marginTop: dimensions.height * 0.02,
                alignSelf: 'flex-end',
              }}
              resizeMode='contain'
            />

            {['My catches', 'Interesting facts', 'My aquarium', 'Information'].map((button, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedTimeChroniclesPage(button);
                }}
                style={{
                  width: dimensions.width * 0.898,
                  height: dimensions.height * 0.12,
                  backgroundColor: selectedTimeChroniclesPage === button ? 'E67C1E' : '#1E67E6',
                  borderRadius: dimensions.width * 0.05551,
                  marginBottom: dimensions.height * 0.01,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    paddingHorizontal: dimensions.width * 0.05,
                    textAlign: 'center',
                    fontSize: dimensions.width * 0.07,
                    fontWeight: 700,
                    alignSelf: 'center',
                    maxWidth: dimensions.width * 0.89,
                    fontFamily: fontRubikRegular,
                    color: '#ffffff',
                  }}>
                  {button}
                </Text>
              </TouchableOpacity>
            ))}

          </SafeAreaView>
        ) : selectedTimeChroniclesPage === 'Information' ? (
          <ChroniclesInformationScreen setSelectedTimeChroniclesPage={setSelectedTimeChroniclesPage} 
          />
        ) : selectedTimeChroniclesPage === 'Interesting facts' ? (
          <ChroniclesFactsScreen setSelectedTimeChroniclesPage={setSelectedTimeChroniclesPage} />
        ) : selectedTimeChroniclesPage === 'My catches' ? (
          <ChroniclesMyCatchesScreen setSelectedTimeChroniclesPage={setSelectedTimeChroniclesPage} />
        ) : selectedTimeChroniclesPage === 'My aquarium' ? (
          <ChroniclesAquariumScreen setSelectedTimeChroniclesPage={setSelectedTimeChroniclesPage} />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChroniclesHomeFishingScreen;
