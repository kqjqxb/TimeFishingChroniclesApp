import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Встанови бібліотеку 'uuid' і імпортуй її
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Share,
    StyleSheet,
    Animated,
} from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fontInterRegular = 'Inter-Regular';

const aquariumFishes = [
    {
        aquariumFishesImage: require('../assets/images/aquariumFishesImages/chroniclesAquariumFish1.png'),
    },
    {
        aquariumFishesImage: require('../assets/images/aquariumFishesImages/chroniclesAquariumFish2.png'),
    },
    {
        aquariumFishesImage: require('../assets/images/aquariumFishesImages/chroniclesAquariumFish3.png'),
    },
    {
        aquariumFishesImage: require('../assets/images/aquariumFishesImages/chroniclesAquariumFish4.png'),
    },
];

const CatchFishComponent = ({ setSelectedAquariumPage }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const styles = createChroniclesFactsStyles(dimensions);
    const [fishCaught, setFishCaught] = useState(0);

    const [activeFishes, setActiveFishes] = useState([]);

    useEffect(() => {
        const fishesWithIds = aquariumFishes.map(fish => ({
            ...fish,
            id: String(Date.now()) + Math.random(),
        }));
        setActiveFishes(fishesWithIds);
    }, []);

    const AnimatedFish = ({ fish, onPress }) => {
        // Рандомний розмір рибки (30–70)
        const fishSize = useRef(30 + Math.random() * 40).current;
        const containerHeight = dimensions.height * 0.442;

        const randomTop = useRef(Math.random() * (containerHeight - fishSize)).current;

        const translateX = useRef(new Animated.Value(-fishSize)).current;

        const randomDelay = useRef(Math.random() * 5000).current;

        const randomDuration = useRef(8000 + Math.random() * 4000).current;

        useEffect(() => {
            Animated.loop(
                Animated.sequence([
                    Animated.delay(randomDelay),
                    Animated.timing(translateX, {
                        toValue: dimensions.width,
                        duration: randomDuration,
                        useNativeDriver: true,
                    }),

                    Animated.timing(translateX, {
                        toValue: -fishSize,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        }, [dimensions.width]);

        return (
            <TouchableOpacity
                onPress={() => onPress(fish)}
                activeOpacity={0.8}
                style={{ position: 'absolute', top: randomTop }}>
                <Animated.Image
                    source={fish.aquariumFishesImage}
                    style={{
                        width: fishSize,
                        height: fishSize,
                        transform: [{ translateX }],
                    }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
    };

    const handleFishPress = (selectedFish) => {
        setFishCaught(prev => prev + 1);
        setActiveFishes(prev => prev.map(fish => {
            if (fish.id === selectedFish.id) {
                const randomFish = aquariumFishes[Math.floor(Math.random() * aquariumFishes.length)];
                return {
                    ...randomFish,
                    id: String(Date.now()) + Math.random(),
                };
            }
            return fish;
        }));
    };

    const updatePlayerFishedChronicles = async (fishCount) => {
        try {
            const storedValue = await AsyncStorage.getItem('playerFishedChronicles');
            const newValue = storedValue ? parseInt(storedValue, 10) + fishCount : fishCount;
            await AsyncStorage.setItem('playerFishedChronicles', newValue.toString());
        } catch (error) {
            console.error('Error updating playerFishedChronicles: ', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, position: 'relative', height: dimensions.height }}>
            <View style={{
                width: dimensions.width * 0.898,
                alignItems: 'center',
                justifyContent: 'flex-start',
                alignSelf: 'center',
                flexDirection: 'row',
            }}>
                <TouchableOpacity
                    onPress={async () => {
                        await updatePlayerFishedChronicles(fishCaught);
                        setSelectedAquariumPage('Aquarium');
                    }}
                    style={{
                        width: dimensions.width * 0.22,
                        height: dimensions.height * 0.1,
                        backgroundColor: '#fff',
                        borderRadius: dimensions.width * 0.04,
                        marginTop: dimensions.height * 0.015,
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Image
                        source={require('../assets/images/homeImage.png')}
                        style={{
                            width: dimensions.width * 0.09,
                            height: dimensions.height * 0.05,
                            alignSelf: 'center',
                        }}
                        resizeMode='contain'
                    />
                </TouchableOpacity>

                <View
                    style={{
                        width: dimensions.width * 0.55,
                        marginLeft: dimensions.width * 0.05,
                        height: dimensions.height * 0.1,
                        backgroundColor: '#fff',
                        borderRadius: dimensions.width * 0.04,
                        marginTop: dimensions.height * 0.015,
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>
                    <Text
                        style={{
                            textAlign: 'left',
                            color: 'black',
                            fontSize: dimensions.width * 0.04,
                            fontFamily: fontInterRegular,
                            fontWeight: '800',
                        }}>
                        Fish caught:
                    </Text>
                    <Text
                        style={{
                            textAlign: 'left',
                            color: '#486095',
                            fontSize: dimensions.width * 0.089,
                            fontFamily: fontInterRegular,
                            fontWeight: '800',
                            marginLeft: dimensions.width * 0.02,
                        }}>
                        {fishCaught}
                    </Text>
                </View>
            </View>

            <View style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                left: 0,
                width: dimensions.width,
                zIndex: 1000,
                height: dimensions.height * 0.442,
            }}>
                {activeFishes.map(fish => (
                    <AnimatedFish key={fish.id} fish={fish} onPress={handleFishPress} />
                ))}
            </View>
        </SafeAreaView>
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
        fontWeight: '700',
    },
});

export default CatchFishComponent;
