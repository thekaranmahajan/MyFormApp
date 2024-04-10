import React, { useState, useRef } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

const FormScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [cameraPermission, setCameraPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(status === 'granted');
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setPhoto(uri);
      setShowCamera(false); // Close camera after taking picture
    }
  };

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (result) {
      // setImage(result.assets[0].uri);
      console.log(result);
      setPhoto(result.assets[0].uri);
      // setPhoto(result.uri); // Update the photo state with the selected image URI
      setShowCamera(false); // Close camera if open
    } else {
      console.log('Image selection canceled or failed.');
    }
  };
  
  

  const onSubmit = (data) => {
    navigation.navigate('Display', { formData: data, photo });
  };

  if (cameraPermission === null) {
    return (
      <View style={styles.container}>
        <Button title="Allow Camera Access" onPress={requestCameraPermission} />
      </View>
    );
  }

  if (cameraPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Camera access denied.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showCamera ? (
        <Camera
          style={styles.camera}
          type={cameraType}
          ref={cameraRef}
        >
          <View style={styles.buttonContainer}>
            <Button title="Switch Camera" onPress={() => setCameraType(
              cameraType === Camera.Constants.Type.front
                ? Camera.Constants.Type.back
                : Camera.Constants.Type.front
            )} />
            <Button title="Take Picture" onPress={takePicture} />
          </View>
        </Camera>
      ) : (
        <View style={styles.formContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="First Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="firstName"
            rules={{ required: true, pattern: /^[A-Za-z]+$/ }}
            defaultValue=""
          />
          {errors.firstName && <Text style={styles.error}>First Name is required and must contain only text.</Text>}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="lastName"
            rules={{ required: true, pattern: /^[A-Za-z]+$/ }}
            defaultValue=""
          />
          {errors.lastName && <Text style={styles.error}>Last Name is required and must contain only text.</Text>}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Age"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
            name="age"
            rules={{ required: true, pattern: /^[0-9]+$/ }}
            defaultValue=""
          />
          {errors.age && <Text style={styles.error}>Age is required and must contain only numbers.</Text>}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
              />
            )}
            name="email"
            rules={{ required: true, pattern: /^\S+@\S+\.\S+$/ }}
            defaultValue=""
          />
          {errors.email && <Text style={styles.error}>Email is required and must be a valid email address.</Text>}

          <View style={styles.buttonContainer}>
            <Button title="Select Photo" onPress={handleImagePicker} />
            <Button title="Take Picture" onPress={() => setShowCamera(true)} />
          </View>
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default FormScreen;
