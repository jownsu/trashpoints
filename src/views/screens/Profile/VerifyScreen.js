import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import COLORS from '../../../consts/colors';
import XText from '../../components/XText';
import { AntDesign } from '@expo/vector-icons';

const VerifyScreen = ({navigation, route}) => {

    const [code, setCode] = useState([])
    let {contact_no} = route.params


    const numberPress = (num) => {
        if(code.length <= 5){
            setCode([...code, num])
        }
    }

    const handleDelete = () => {
        setCode(code.slice(0 , code.length - 1))
    }

    const handleDeleteAll = () => {
        setCode([])
    }


    return(

        <SafeAreaView style={styles.container}>
            
            <TouchableOpacity onPress={() => navigation.pop()}>
                <AntDesign name="back" size={38} color="black" style={styles.backIcon} />
            </TouchableOpacity>

            <View style={styles.container2}>
        
                <XText bold style={styles.textTitle}>Verify your Phone Number</XText>
                <View style={styles.numContainer}>
                    <XText>{contact_no} </XText>
                    <TouchableOpacity onPress={() => {}}>
                        <XText bold style={styles.textSend}>Send Now</XText>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.textInputContainer}>
                    <View style={styles.textInputView}>
                        <Text style={styles.textInsideView}>{code[0]}</Text>
                    </View>
            
                    <View style={styles.textInputView}>
                        <Text style={styles.textInsideView}>{code[1]}</Text>
                    </View>
            
                    <View style={styles.textInputView}>
                        <Text style={styles.textInsideView}>{code[2]}</Text>
                    </View>
            
                    <View style={styles.textInputView}>
                        <Text style={styles.textInsideView}>{code[3]}</Text>
                    </View>
            
                    <View style={styles.textInputView}>
                        <Text style={styles.textInsideView}>{code[4]}</Text>
                    </View>
            
                    <View style={styles.textInputView}>
                        <Text style={styles.textInsideView}>{code[5]}</Text>
                    </View>
                </View>
            
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.buttonProperty} onPress={() => {numberPress(1)}}>
                        <Text style={styles.textButton}>1</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.buttonProperty} onPress={() => {numberPress(2)}}>
                        <Text style={styles.textButton}>2</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonProperty} onPress={() => {numberPress(3)}}>
                        <Text style={styles.textButton}>3</Text>
                    </TouchableOpacity>
                </View>
        
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.buttonProperty} onPress={() => {numberPress(4)}}>
                        <Text style={styles.textButton}>4</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonProperty} onPress={() => {numberPress(5)}}>
                        <Text style={styles.textButton}>5</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonProperty} onPress={() => {numberPress(6)}}>
                        <Text style={styles.textButton}>6</Text>
                    </TouchableOpacity>
                </View>
            
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.buttonProperty} onPress={() => {numberPress(7)}}>
                        <Text style={styles.textButton}>7</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonProperty} onPress={() => {numberPress(8)}}>
                        <Text style={styles.textButton}>8</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonProperty} onPress={() => {numberPress(9)}}>
                        <Text style={styles.textButton}>9</Text>
                    </TouchableOpacity>
                </View>
        
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.buttonProperty} onPress={() => {handleDeleteAll()}}>
                        <Text style={styles.textButton}>C</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonProperty} onPress={() => {numberPress(0)}}>
                        <Text style={styles.textButton}>0</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonProperty} onPress={() => {handleDelete()}}>
                        <Text style={styles.textButton}>DEL</Text>
                    </TouchableOpacity>
                </View>
        
                <View>
                    <Button mode="contained" color={COLORS.primary} style={styles.submitBut} onPress={()=>{
                            alert(code.join(''))
                            setCode([])
                        }} >
                        Submit
                    </Button>
                </View>
            
            </View>
    
        </SafeAreaView>
        
      );
    }


export default VerifyScreen



const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  container2:{
    alignItems: "center",
  },
  textTitle:{
    textAlign: "center",
    fontSize: 20,
  },
  numContainer:{
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center'
  },
  textSend:{
      color: 'blue',
      fontSize: 16
  },
  buttonView:{
    flexDirection: "row",
  },
  buttonProperty:{
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: 60,
    width: 60,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "green",
    margin: 10
  },
  textButton:{
    fontSize: 18,
    color: "green"
  },
  textInputView:{
    height: 45,
    width: 45,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 20,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInsideView:{
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
  textInputContainer:{
    flexDirection: "row"
  },
  submitBut:{
    margin: 20,
  },
  backIcon:{
      color: COLORS.primary,
      marginTop: 10,
      marginLeft: 10
  }
})