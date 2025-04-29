import React, { useEffect, useState, useRef, use } from 'react';
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    Image,
    StyleSheet,
    Animated,
} from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AquariumComponent from './AquariumComponent';

const fontInterRegular = 'Inter-Regular';

const aquariumItems = [
    {
        id: 1,
        aquariumItemImage: require('../assets/images/aquariumItemsImages/chroniclesAquariumItem1.png'),
    },
    {
        id: 2,
        aquariumItemImage: require('../assets/images/aquariumItemsImages/chroniclesAquariumItem2.png'),
    },
    {
        id: 3,
        aquariumItemImage: require('../assets/images/aquariumItemsImages/chroniclesAquariumItem3.png'),
    },
    {
        id: 4,
        aquariumItemImage: require('../assets/images/aquariumItemsImages/chroniclesAquariumItem4.png'),
    },
];

const aquariumFishes = [
    {
        id: 1,
        aquariumFishesImage: require('../assets/images/aquariumFishesImages/chroniclesAquariumFish1.png'),
    },
    {
        id: 2,
        aquariumFishesImage: require('../assets/images/aquariumFishesImages/chroniclesAquariumFish2.png'),
    },
    {
        id: 3,
        aquariumFishesImage: require('../assets/images/aquariumFishesImages/chroniclesAquariumFish3.png'),
    },
    {
        id: 4,
        aquariumFishesImage: require('../assets/images/aquariumFishesImages/chroniclesAquariumFish4.png'),
    },
];

const EditAquariumComponent = ({ setSelectedAquariumPage, selectedAquariumPage }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const styles = createChroniclesFactsStyles(dimensions);
    const [isAddFishesVisible, setIsAddFishesVisible] = useState(false);
    const [playerFishedChronicles, setPlayerFishedChronicles] = useState(0);
    const [usersSubjects, setUsersSubjects] = useState([]);
    const [showNotEnoughFunds, setShowNotEnoughFunds] = useState(false);
    const modalOpacity = useRef(new Animated.Value(0)).current;
    const [userAquariumFishes, setUserAquariumFishes] = useState([]);

    useEffect(() => {
        const loadAquariumFishes = async () => {
            try {
                const storedFishes = await AsyncStorage.getItem('userAquariumFishes');
                if (storedFishes !== null) {
                    setUserAquariumFishes(JSON.parse(storedFishes));
                }
            } catch (error) {
                console.error('Error loading userAquariumFishes: ', error);
            }
        };
        loadAquariumFishes();
    }, []);

    const handleBuyFish = async (fishId) => {
        if (playerFishedChronicles >= 1) {
            const newFishes = [...userAquariumFishes, fishId];
            const newBalance = playerFishedChronicles - 1;
            setUserAquariumFishes(newFishes);
            setPlayerFishedChronicles(newBalance);
            try {
                await AsyncStorage.setItem('playerFishedChronicles', newBalance.toString());
                await AsyncStorage.setItem('userAquariumFishes', JSON.stringify(newFishes));
            } catch (error) {
                console.error('Error updating storage: ', error);
            }
        } else {
            setShowNotEnoughFunds(true);
            Animated.sequence([
                Animated.timing(modalOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.delay(1500),
                Animated.timing(modalOpacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setShowNotEnoughFunds(false);
            });
        }
    };

    useEffect(() => {
        const loadStorageData = async () => {
            try {
                const storedBalance = await AsyncStorage.getItem('playerFishedChronicles');
                if (storedBalance !== null) {
                    setPlayerFishedChronicles(parseInt(storedBalance, 10));
                }
                const storedSubjects = await AsyncStorage.getItem('usersSubjects');
                if (storedSubjects !== null) {
                    setUsersSubjects(JSON.parse(storedSubjects));
                }
            } catch (error) {
                console.error('Error loading storage data: ', error);
            }
        };

        loadStorageData();
    }, []);

    const handleExchange = async (itemId) => {
        if (playerFishedChronicles >= 10) {
            if (!usersSubjects.includes(itemId)) {
                const newSubjects = [...usersSubjects, itemId];
                const newBalance = playerFishedChronicles - 10;
                setUsersSubjects(newSubjects);
                setPlayerFishedChronicles(newBalance);
                try {
                    await AsyncStorage.setItem('playerFishedChronicles', newBalance.toString());
                    await AsyncStorage.setItem('usersSubjects', JSON.stringify(newSubjects));
                } catch (error) {
                    console.error('Error updating storage: ', error);
                }
            }
        } else {
            setShowNotEnoughFunds(true);
            Animated.sequence([
                Animated.timing(modalOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.delay(1500),
                Animated.timing(modalOpacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setShowNotEnoughFunds(false);
            });
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, position: 'relative' }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{
                        width: dimensions.width * 0.898,
                        height: dimensions.height * 0.1,
                        borderRadius: dimensions.width * 0.065,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        paddingHorizontal: dimensions.width * 0.05,
                        backgroundColor: '#E67C1E',
                        alignSelf: 'center',
                        marginTop: dimensions.height * 0.01,
                        flexDirection: 'row',
                    }}>
                        <TouchableOpacity onPress={() => {
                            setSelectedAquariumPage('Aquarium');
                        }}>
                            <ArrowLeftIcon size={dimensions.width * 0.07} color='white' />
                        </TouchableOpacity>
                        <Text
                            style={{
                                textAlign: 'center',
                                color: 'white',
                                fontSize: dimensions.width * 0.07,
                                alignSelf: 'center',
                                fontFamily: fontInterRegular,
                                fontWeight: 800,
                                marginLeft: dimensions.width * 0.1,
                            }}>
                            My Aquarium
                        </Text>
                    </View>
                    
                    <AquariumComponent playerFishedChronicles={playerFishedChronicles} userAquariumFishes={userAquariumFishes} setPlayerFishedChronicles={setPlayerFishedChronicles}
                        setUserAquariumFishes={setUserAquariumFishes} setUsersSubjects={setUsersSubjects} usersSubjects={usersSubjects} selectedAquariumPage={selectedAquariumPage} 
                    />

                    <View style={{
                        width: dimensions.width * 0.898,
                        paddingHorizontal: dimensions.width * 0.05,
                        paddingVertical: dimensions.height * 0.02,
                        borderRadius: dimensions.width * 0.05,
                        backgroundColor: 'white',
                        alignSelf: 'center',
                        marginTop: -dimensions.height * 0.01,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}>
                            <View>
                                <Text
                                    style={{
                                        textAlign: 'left',
                                        color: 'black',
                                        fontSize: dimensions.width * 0.055,
                                        fontFamily: fontInterRegular,
                                        fontWeight: 800,
                                    }}>
                                    Subjects
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsAddFishesVisible((prev) => !prev);
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'left',
                                            color: '#486095',
                                            fontSize: dimensions.width * 0.035,
                                            fontFamily: fontInterRegular,
                                            fontWeight: 500,
                                            marginTop: dimensions.height * 0.005,
                                        }}>
                                        {!isAddFishesVisible ? 'Go to fishes' : 'Back to subjects'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                paddingHorizontal: dimensions.width * 0.05,
                                paddingVertical: dimensions.height * 0.02,
                                borderRadius: dimensions.width * 0.023,
                                borderColor: '#486095',
                                borderWidth: dimensions.width * 0.004,
                            }}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        color: '#486095',
                                        fontSize: dimensions.width * 0.055,
                                        fontFamily: fontInterRegular,
                                        fontWeight: 800,
                                    }}>
                                    Fish: {playerFishedChronicles ? playerFishedChronicles : 0}
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            flexWrap: 'wrap',
                            marginTop: dimensions.height * 0.01,
                        }}>
                            {isAddFishesVisible ? aquariumFishes.map((item, index) => (
                                <TouchableOpacity
                                    disabled={userAquariumFishes.includes(item.id)}
                                    key={index}
                                    onPress={() => handleBuyFish(item.id)}
                                    style={{
                                        width: dimensions.width * 0.38,
                                        height: dimensions.height * 0.16,
                                        borderRadius: dimensions.width * 0.03,
                                        backgroundColor: 'rgba(74, 112, 182, 0.15)',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: dimensions.height * 0.012,
                                    }}>
                                    <Image
                                        source={item.aquariumFishesImage}
                                        style={{
                                            width: dimensions.width * 0.2,
                                            height: dimensions.width * 0.2,
                                            borderRadius: dimensions.width * 0.03,
                                        }}
                                        resizeMode='contain'
                                    />
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            color: '#1E67E6',
                                            fontSize: dimensions.width * 0.033,
                                            fontFamily: fontInterRegular,
                                            fontWeight: 800,
                                        }}>
                                        {userAquariumFishes.includes(item.id) ? 'You have it!' : 'Add Fish'}
                                    </Text>
                                </TouchableOpacity>
                            )) : aquariumItems.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handleExchange(item.id)}
                                    disabled={usersSubjects.includes(item.id)}
                                    style={{
                                        width: dimensions.width * 0.38,
                                        height: dimensions.height * 0.16,
                                        borderRadius: dimensions.width * 0.03,
                                        backgroundColor: 'rgba(74, 112, 182, 0.15)',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: dimensions.height * 0.012,

                                    }}>
                                    <Image
                                        source={item.aquariumItemImage}
                                        style={{
                                            width: dimensions.width * 0.2,
                                            height: dimensions.width * 0.2,
                                            borderRadius: dimensions.width * 0.03,
                                        }}
                                        resizeMode='contain'
                                    />
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            color: '#1E67E6',
                                            fontSize: dimensions.width * 0.033,
                                            fontFamily: fontInterRegular,
                                            fontWeight: 800,
                                        }}>
                                        {!usersSubjects.includes(item.id) ? 'Exchange for 10 fish' : 'You have it!'}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </SafeAreaView>
            </View>
            {showNotEnoughFunds && (
                <Animated.View style={{
                    position: 'absolute',
                    top: dimensions.height * 0.35,
                    left: dimensions.width * 0.25,
                    width: dimensions.width * 0.5,
                    height: dimensions.height * 0.12,
                    backgroundColor: 'white', // білий фон
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: dimensions.width * 0.03,
                    shadowColor: '#000',
                    shadowOpacity: 0.3,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 4,
                    elevation: 5,
                    opacity: modalOpacity,
                }}>
                    <Text style={{ color: 'black', fontSize: dimensions.width * 0.045 }}>Not enaugh fishes!</Text>
                </Animated.View>
            )}
        </View>
    );
};

const createChroniclesFactsStyles = (dimensions) => StyleSheet.create({
    button: {
        width: dimensions.width * 0.5,
        height: dimensions.height * 0.09,
        borderRadius: dimensions.width * 0.04444,
        backgroundColor: '#1E67E6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: dimensions.width * 0.03,
        alignSelf: 'center',
        marginTop: dimensions.height * 0.05,
        zIndex: 9999999,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: dimensions.width * 0.06,
        alignSelf: 'center',
        fontFamily: fontInterRegular,
        fontWeight: 700,
    },
});

export default EditAquariumComponent;
