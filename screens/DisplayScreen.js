// DisplayScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DisplayScreen = ({ route }) => {
  const { formData, photo } = route.params;

  return (
    <View style={styles.container}>
      <Text>First Name: {formData.firstName}</Text>
      <Text>Last Name: {formData.lastName}</Text>
      <Text>Age: {formData.age}</Text>
      <Text>Email: {formData.email}</Text>
      {photo && <Image source={{ uri: photo }} style={styles.photo} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  photo: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default DisplayScreen;
