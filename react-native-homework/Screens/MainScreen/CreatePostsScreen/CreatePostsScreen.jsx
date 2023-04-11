import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text, TextInput } from  'react-native';
import { Camera } from "expo-camera";
import { Entypo, Feather, EvilIcons } from '@expo/vector-icons'; 
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from 'expo-image-picker';


const initialState = {
    title: "",
    location: "",
};

const CreatePostScreen = ({navigation}) => {
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [location, setLocation] = useState(null);
    const [inputState, setInputState] = useState(initialState);
    const [isShowKey, setIsShowKey] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);


    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return;
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
    
            setHasPermission(status === "granted");
        })();
    }, []);

    const addPhotoFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const photo = await camera.takePictureAsync();
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setPhoto(photo.uri);
    };

    const sendPhoto = () => {
        navigation.navigate('DefaultScreen', {photo});
        setInputState(initialState);
        setPhoto(null);
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const deletePhoto = () => {
        setPhoto(null);
        setInputState(initialState);
    };

    const keyboardHide = () => {
        setIsShowKey(false);
        Keyboard.dismiss();
    };

    return(
        <View style={styles.container}>
            <Camera style={styles.camera} ref={setCamera}>
                {photo && (
                    <View style={styles.photoContainer}>
                        <Image style={styles.photo} source={{ uri: photo }}></Image>
                    </View>
                )}
                <TouchableOpacity onPress={takePhoto} style={styles.iconContainer}>
                    <Entypo name="camera" size={24} color="#BDBDBD"/>
                </TouchableOpacity>
            </Camera>
            <TouchableOpacity style={styles.addPhotoGallery} onPress={addPhotoFromGallery}>
                <Text style={styles.addPhotoText}>Завантажити з галереї</Text>
            </TouchableOpacity>

            <View style={styles.form}>
            <TextInput
                style={styles.input}
                placeholder={"Назва..."}
                value={inputState.title}
                onFocus={() => setIsShowKey(true)}
                onChangeText={(value) =>
                setInputState((prev) => ({ ...prev, title: value }))
                }
            />
            <View style={styles.locationInputContainer}>
                <EvilIcons
                style={styles.locationIcon}
                name="location"
                size={24}
                color="#BDBDBD"
              />
              <TextInput
                style={styles.locationInput}
                placeholder={"Локація..."}
                value={inputState.location}
                onFocus={() => setIsShowKey(true)}
                onChangeText={(value) =>
                  setInputState((prev) => ({ ...prev, location: value }))
                }
              />
            </View>
          </View>
            <View>
                <TouchableOpacity onPress={sendPhoto} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Опублікувати</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.deleteButtonContainer}>
          <TouchableOpacity
              onPress={deletePhoto}
              activeOpacity={0.8}
              style={styles.deleteButton}
              >
              <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        backgroundColor: "#F6F6F6",
        height: 240,
        marginTop: 32,
        marginHorizontal: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    iconContainer: {
        width: 60,
        height: 60,
        backgroundColor: "#fff", 
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",  
    },
    photoContainer: {
        position: "absolute",
        flexDirection: "row",
        top: 0,
        left: 0,
    },
    photo: {
        flex: 1,
        height: 240,
    },
    form: {
        marginHorizontal: 16,
        marginTop: 28,
    },
    addPhotoGallery: {
        marginHorizontal: 16,
        marginTop: 12,
    },
    addPhotoText:{
        fontSize: 16,
        color: "#BDBDBD"
    },
    input: {
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
    },
    locationInputContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
    },
    locationIcon: {
        marginRight: 8,
    },
    locationInput: {
        flex: 1,
        height: 50,
    },
    buttonText: {
        fontFamily: "Roboto-Regular",
        textAlign: "center",
        fontSize: 16,
        lineHeight: 19,
        color: "#fff",
    },
    buttonContainer: {
        marginHorizontal: 16,
        marginTop: 32,
        height: 51,
        backgroundColor: "#FF6C00",
        borderRadius: 100,
        justifyContent: "center",
    },
    deleteButtonContainer: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        paddingBottom: 15,
    },
    deleteButton: {
        backgroundColor: "#F6F6F6",
        borderRadius: 20,
        paddingHorizontal: 28,
        paddingVertical: 10,
    }
})


export default CreatePostScreen;