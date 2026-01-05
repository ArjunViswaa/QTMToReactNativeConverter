
    import React from 'react';
    import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';

    const Home = () => {
      return (
        <SafeAreaView style={styles.sfbe0b910dfe4363bf286a9d2ada7748}>
<View id="flxMain" style={[styles.s19732cc71f74982b56d7775d20ba47f, {width:"100%",height:"100%"}]}>

        <TouchableOpacity style={[styles.s3107773f6d047dbb85a29d5c6464574, {width:"80%",height:"10%",position:"absolute",left:"50%",top:"50%",transform:[{translateX:"-50%"},{translateY:"-50%"}]}]}>
          <Text style={styles.btnText}>Hello! Click Me</Text>
        </TouchableOpacity>
</View>
</SafeAreaView>
      );
    };

    const styles = StyleSheet.create({
      container: { flex: 1 },
      // Your CSS skins mapping goes here
      sfbe0b910dfe4363bf286a9d2ada7748: { flex: 1, backgroundColor: '#fff' },
      s19732cc71f74982b56d7775d20ba47f: { flex: 1 }, // flxMain skin
      s3107773f6d047dbb85a29d5c6464574: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5 }, // btn skin
      btnText: { color: 'white', textAlign: 'center' }
    });

    export default Home;
  