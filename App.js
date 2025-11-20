import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {Animated, Button, Dimensions, Image, StyleSheet, Text, TextInput, Touchable, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import logo from './assets/location-icon.png';
import * as ImagePicker from 'expo-image-picker';
import {Ionicons} from '@expo/vector-icons';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';

function HeadlineText(props){
  return(
    <Text style={styles.headlinetext}>{props.text}</Text>
  )
}
function HeadlineImage(props){
  return(
    <Image source={logo} style={{width:200, height:200}}/>
  )
}
function Headline(props){
  return(
    <View>
      <HeadlineImage/>
      <HeadlineText text={props.text}/>
    </View>
  )
}
function BodyText(props){
  return(
    <Text style={styles.bodyText}>{props.text}</Text>
  )
}
//ImagePicker
function ImageDisplay(props){
  if(props.selectedImage !== null){
    return(
        <Image source={{uri:props.selectedImage}} style={{width:305, height: 159}}/>
    );
  }
  return null;
}
function ImageButton(props){
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(permissionResult.granted === false){
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.canceled === true){
      return;
    }
    props.setSelectedImage(pickerResult["assets"][0].uri)
  }
  return (
    <TouchableOpacity
      onPress={openImagePickerAsync}
      style={{backgroundColor: 'bule'}}>
        <Text style={{fontSize:20, color:'#000000ff'}}> Pick a photo</Text>
    </TouchableOpacity>
  )
}
function ImageHandler(props){
  return (
    <View>
      <ImageButton selectedImage={props.selectedImage} setSelectedImage={props.setSelectedImage}/>
      <ImageDisplay selectedImage={props.selectedImage}/>
    </View>
  )
}


function Likecounter(){
  const [count, setCount] = React.useState(0);
  const increment = () => {
    setCount((oldCount) => oldCount +1);
  };
  const decrement = () => {
    setCount((oldCount) => oldCount -1);
  };
  return(
    <View style={styles.button}>
      <Text>Like: {count}</Text>
      <Button 
        title='Like'
        onPress={increment}
      />
      <Button  style={styles.button}
        title='DisLike'
        onPress={decrement}
      />
      </View>
  )
}
//6.3 Common components
function Message({children}){
  return(
    <Text style={styles.message} numberOfLines={1} adjustsFontSizeToFit={true}>{children}</Text>
  );
}
//6.3 'screen size-dependent scalling
function scaleSize(fontSize){
  const window = Dimensions.get('window');
  return Math.round((fontSize/375) * Math.min(window.width, window.height));
}

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const clearImage = () =>{
    setSelectedImage(null);
    };
  const [state, setState] = useState({ txt:"" });
  function updateText(newText){
    setState((oldState) => ({ ...oldState, txt: newText}));
  }
  const tap = Gesture.Tap().onStart(() =>{
    console.log("Tapped!");});
  
  
  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={tap}>

      <View style={styles.container}>
        <Ionicons
          style={styles.icon}
          name='checkmark-circle'
          size={100}
          color='green'
        />
        <Ionicons style={styles.icon} name='help' size={30} color='red'/>
        <TouchableHighlight style={styles.button} onPress={() => console.log('Button 1 pressed')}>
          <Text style={styles.label}>Button 1</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => console.log('Button 2 pressed')}>
          <Text style={styles.label}>Button 2</Text>
        </TouchableHighlight>
        <Headline text = 'Photo share!'/>
        <BodyText text = "Press Button " />
        <ImageHandler selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
        <StatusBar style="auto" />
        
        <Likecounter/>

        <Button 
          title='clear'
          onPress={clearImage}
        />
        <Message>Short message</Message> 
        <Message>Slightly longer messages</Message> 
            
        <TextInput
          style={styles.input}
          placeholder='please enter name'
          placeholderTextColor="blue"
          defaultValue={state.txt}
          onChangeText={updateText}
          autoFocus={true}
          autoCorrect={true}
          />

      </View>
    </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyText:{
    color:'#737373',
    fontSize: 18,
  },
  headlinetext:{
    color:'rgba(34, 255, 56, 1)',
    fontSize: 40,
  },
  button:{
   backgroundColor: "yellow", 
   margin: 5, 
   padding: 1, 
   borderColor: "blue", 
   borderWidth: StyleSheet.hairlineWidth, 
   borderRadius: 30, 
   fontSize: 30, 
   width: 150, 
   height: 30, 
   textAlign: "right", 
   textAlignVertical: "bottom", 
   textDecorationLine: "underline" 
  },
  message:{
    margin:5,
    width:200,
    borderWidth:1,
    padding:10,
    backgroundColor:'yellow'
  },
  input:{
    borderWidth:1,
    borderRadius:5,
    width: 250,
    padding:5,
    backgroundColor:"red",
    color:"white",
    fontSize:20,
    fontStyle:"italic"
  },
  icon:{
    backgroundColor:'pink',
    margin:5,
    padding:15,
    borderColor:'blue',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius:5,
    fontSize:50,
  },
  label:{
    color:'black',
    fontSize:30,
    fontWeight:'bold',
    fontStyle:'italic'
  },
  message:{
    margin: scaleSize(5),
    width:scaleSize(200),
    fontSize:scaleSize(20),
    borderWidth:1,
    padding: scaleSize(10),
    backgroundColor:'red'
  }
});
