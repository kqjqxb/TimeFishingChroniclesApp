import { useNavigation } from '@react-navigation/native';
import { Image, View, ActivityIndicator } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useDispatch } from 'react-redux';
import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadUserData } from '../redux/userSlice';
import { UserContext } from '../context/UserContext';

const ChroniclesLoadingScreen = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  const dispatch = useDispatch();

  const [isChroniclesOnboardingWasVisibled, setChroniclesOnboardingWasVisibled] = useState(false);
  const [initializationChroniclesComplete, setInitializationChroniclesComplete] = useState(false);

  useEffect(() => {
    const loadChroniclesUserFisher = async () => {
      try {
        const deviceId = await DeviceInfo.getUniqueId();
        const storageKey = `currentUser_${deviceId}`;
        const storedChroniclesUserFisher = await AsyncStorage.getItem(storageKey);
        const isChroniclesOnboardingFisherVis = await AsyncStorage.getItem('isChroniclesOnboardingFisherVis');

        if (storedChroniclesUserFisher) {
          setUser(JSON.parse(storedChroniclesUserFisher));
          setChroniclesOnboardingWasVisibled(false);
        } else if (isChroniclesOnboardingFisherVis) {
          setChroniclesOnboardingWasVisibled(false);
        } else {
          setChroniclesOnboardingWasVisibled(true);
          await AsyncStorage.setItem('isChroniclesOnboardingFisherVis', 'true');
        }
      } catch (error) {
        console.error('Error loading of montYou Real user', error);
      } finally {
        setInitializationChroniclesComplete(true);
      }
    };

    loadChroniclesUserFisher();
  }, [setUser]);

  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

  useEffect(() => {
    if (initializationChroniclesComplete) {
      const timer = setTimeout(() => {
        const destination = isChroniclesOnboardingWasVisibled ? 'TimeChroniclesOnboarding' : 'TimeChroniclesHome';
        navigation.replace(destination);
      }, 2555);
      return () => clearTimeout(timer);
    }
  }, [initializationChroniclesComplete, isChroniclesOnboardingWasVisibled, navigation]);

  return (
    <View style={{
      justifyContent: 'center',
      width: '100%',
      alignItems: 'center',
      backgroundColor: '#002357',
      height: '100%',
      alignSelf: 'center',
    }}>
      <ActivityIndicator size="large" color="#3b8efb" />
    </View>
  );
};

export default ChroniclesLoadingScreen;
