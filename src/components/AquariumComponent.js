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

const AquariumComponent = ({ setSelectedAquariumPage, playerFishedChronicles, userAquariumFishes, 
    setUserAquariumFishes, setUsersSubjects, usersSubjects, selectedAquariumPage}) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));

    useEffect(() => {
        const loadStorageData = async () => {
            try {
                const storedFishes = await AsyncStorage.getItem('userAquariumFishes');
                if (storedFishes !== null) {
                    setUserAquariumFishes(JSON.parse(storedFishes));
                }
                const storedSubjects = await AsyncStorage.getItem('usersSubjects');
                if (storedSubjects !== null) {
                    setUsersSubjects(JSON.parse(storedSubjects));
                }
            } catch (error) {
                console.error('Error loading storage data: ', error);
            }
        };

        if(selectedAquariumPage !== 'Edit aquarium') loadStorageData();
    }, [playerFishedChronicles]);

    useEffect(() => {
        console.log('userAquariumFishes', userAquariumFishes);
        console.log('usersSubjects', usersSubjects);
    }, [userAquariumFishes, usersSubjects]);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                position: 'relative',
            }}>
                <Image
                    source={require('../assets/images/editingAquariumPage.png')}
                    style={{
                        width: dimensions.width * 0.8,
                        height: dimensions.height * 0.3,
                        alignSelf: 'center',
                        opacity: 0.85,
                    }}
                    resizeMode='contain'
                />

                {usersSubjects?.includes(aquariumItems[0].id) && (
                    <Image
                        source={aquariumItems[0].aquariumItemImage}
                        style={{
                            width: dimensions.width * 0.23,
                            height: dimensions.height * 0.1,
                            alignSelf: 'center',
                            opacity: 0.85,
                            position: 'absolute',
                            bottom: dimensions.height * 0.07,
                            right: dimensions.width * 0.16,
                        }}
                        resizeMode='contain'
                    />
                )}

                {usersSubjects?.includes(aquariumItems[2].id) && (
                    <Image
                        source={aquariumItems[2].aquariumItemImage}
                        style={{
                            width: dimensions.width * 0.23,
                            height: dimensions.height * 0.1,
                            alignSelf: 'center',
                            opacity: 0.85,
                            position: 'absolute',
                            bottom: dimensions.height * 0.07,
                            left: dimensions.width * 0.16,
                        }}
                        resizeMode='contain'
                    />
                )}

                {usersSubjects?.includes(aquariumItems[1].id) && (
                    <Image
                        source={aquariumItems[1].aquariumItemImage}
                        style={{
                            width: dimensions.width * 0.15,
                            height: dimensions.height * 0.08,
                            alignSelf: 'center',
                            opacity: 0.85,
                            position: 'absolute',
                            bottom: dimensions.height * 0.07,
                            left: dimensions.width * 0.4,
                        }}
                        resizeMode='contain'
                    />
                )}

                {usersSubjects?.includes(aquariumItems[3].id) && (
                    <Image
                        source={aquariumItems[3].aquariumItemImage}
                        style={{
                            width: dimensions.width * 0.2,
                            height: dimensions.height * 0.08,
                            alignSelf: 'center',
                            opacity: 0.85,
                            position: 'absolute',
                            bottom: dimensions.height * 0.035,
                            right: dimensions.width * 0.15,
                        }}
                        resizeMode='contain'
                    />
                )}

                {userAquariumFishes?.includes(aquariumFishes[2].id) && (
                    <Image
                        source={aquariumFishes[2].aquariumFishesImage}
                        style={{
                            width: dimensions.width * 0.1,
                            height: dimensions.height * 0.1,
                            alignSelf: 'center',
                            opacity: 0.85,
                            position: 'absolute',
                            top: dimensions.height * 0.07,
                            left: dimensions.width * 0.2,
                        }}
                        resizeMode='contain'
                    />
                )}

                {userAquariumFishes?.includes(aquariumFishes[0].id) && (
                    <Image
                        source={aquariumFishes[0].aquariumFishesImage}
                        style={{
                            width: dimensions.width * 0.1,
                            height: dimensions.height * 0.1,
                            alignSelf: 'center',
                            opacity: 0.85,
                            position: 'absolute',
                            top: dimensions.height * 0.05,
                            right: dimensions.width * 0.2,
                        }}
                        resizeMode='contain'
                    />
                )}

                {userAquariumFishes?.includes(aquariumFishes[1].id) && (
                    <Image
                        source={aquariumFishes[1].aquariumFishesImage}
                        style={{
                            width: dimensions.width * 0.1,
                            height: dimensions.height * 0.1,
                            alignSelf: 'center',
                            opacity: 0.85,
                            position: 'absolute',
                            top: dimensions.height * 0.06,
                            left: dimensions.width * 0.43,
                            transform: [{ scaleX: -1 }]
                        }}
                        resizeMode='contain'
                    />
                )}


                {userAquariumFishes?.includes(aquariumFishes[3].id) && (
                    <Image
                        source={aquariumFishes[3].aquariumFishesImage}
                        style={{
                            width: dimensions.width * 0.1,
                            height: dimensions.height * 0.1,
                            alignSelf: 'center',
                            opacity: 0.85,
                            position: 'absolute',
                            top: dimensions.height * 0.1,
                            right: dimensions.width * 0.3,
                            zIndex: 999,
                            transform: [{ scaleX: -1 }]
                        }}
                        resizeMode='contain'
                    />
                )}
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
        fontWeight: 700,
    },
});

export default AquariumComponent;
