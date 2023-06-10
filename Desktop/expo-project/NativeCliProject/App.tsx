import React from 'react';

import {Button, View, StyleSheet, Text} from 'react-native';

function App(): JSX.Element {
  return (
    <View style={styles.btn}>
      <Text style={styles.text}>Welcome to first React Native Project</Text>
      <Button title="Press Me" />
      <Button title="Press Me" />
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'red',
    fontSize: 30,
  },
  text:{
    fontSize:30,
    textAlign:'center'
  }
});

export default App;
;