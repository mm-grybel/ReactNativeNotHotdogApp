import React, { Component, useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import Tflite from 'tflite-react-native';

let tflite = new Tflite();
var modelFile = 'models/model.tflite';
var labelsFile = 'models/labels.txt';

export default class App extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            recognitions: null,
            source: null
        };

        tflite.loadModel({ 
            model: modelFile, 
            labels: labelsFile 
        }, 
        (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
            }
        });
    };

    selectGalleryImage() {
        const options = {};
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled Image');
            } else if (response.error) {
                console.log('Error');
            } else if (response.customButton) {
                console.log('User pressed Custom Button');
            } else {
                this.setState({
                    source: { uri: response.uri }
                });
            }
        });
    };

    render() {
        return (
            <LinearGradient 
                colors={['#1e1e1e', '#222']} 
                style={styles.linearGradient}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Not HotDog</Text>
                    <Text style={styles.subtitle}>Seafood Startup</Text>
                </View>
                <View style={styles.outputContainer}>
                    <Image 
                        source={require('./assets/hotdog.jpeg')} 
                        style={styles.image}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <View>
                        <Button 
                            title='Camera Roll'
                            titleStyle={{ fontSize: 20 }}
                            containerStyle={{ margin: 5 }} 
                            buttonStyle={styles.button}
                            onPress={this.selectGalleryImage.bind(this)}
                        />
                    </View>
                    <View>
                        <Button
                            title='Take a Photo'
                            titleStyle={{ fontSize: 20 }}
                            containerStyle={{ margin: 5 }}
                            buttonStyle={styles.button}
                        />
                    </View>
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1
    },
    titleContainer: {
        marginTop: 70,
        marginLeft: 40
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff'
    },
    subtitle: {
        fontSize: 16,
        color: '#fff'
    },
    outputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 200, 
        height: 57,
        borderRadius: 8
    },
    image: {
        height: 250,
        width: 250
    }
});
