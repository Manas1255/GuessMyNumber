import { TextInput, View, StyleSheet, Alert,Text, Dimensions, useWindowDimensions } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/Colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
function StartGameScreen({onPickNumber}){

    const [enteredNumber, setEnteredNumber]= useState('');
    function numberInputHandler(enteredText){
        setEnteredNumber(enteredText);
    }

    const {width, height} = useWindowDimensions();
    function resetInputHandler()
    {
        setEnteredNumber('');
    }

    function confirmInputHandler(){
        const chosenNumber = parseInt(enteredNumber);

        if (isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber >99)
        {
            Alert.alert('Invalid Number!',
            'Number should be between 0 and 99',
            [{text: "Okay", style: 'destructive', onPress: setEnteredNumber}]);
            return;
        }

        onPickNumber(chosenNumber);
    }

    const marginTopDistance = height < 380 ? 30 : 100;
    return (
    <View style={[styles.rootContainer, {marginTop: marginTopDistance}]}>   
        <Title>Guess My Number</Title>
        <Card>
        <InstructionText>Enter a Number</InstructionText>
        <TextInput style={styles.numberInput} maxLength={2}
        keyboardType= 'number-pad' autoCapitalize="none" autoCorrect={false}
        value={enteredNumber}
        onChangeText={numberInputHandler}></TextInput>
        
        <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
            </View>
        </View>
        </Card>
    </View>
    );
}

export default StartGameScreen;


//const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        alignItems:'center',
        //marginTop: deviceHeight < 400 ? 30: 100 
    },
    numberInput:{
        height: 50,
        fontSize: 32,
        borderBottomColor: '#ddb52f',
        borderBottomWidth: 2,
        color: '#ddb52f',
        marginVertical: 8,
        fontWeight: 'bold',
        width: 50,
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer:{
        flex:1
    }
});