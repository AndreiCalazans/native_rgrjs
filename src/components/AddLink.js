import React from 'react';
import {View, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';

class AddLink extends React.Component{
    constructor(props) {
        super(props);
        this.state = {title: '', url: ''}
    }

    navigationOptions = {
        title: 'Add Link'
    }

    _onSubmit() {
        console.log(this.state.title , this.state.url)
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                placeholder='Title'
                onChangeText={(title) => this.setState({title})}> 
                </TextInput>
                <TextInput
                placeholder='url'
                onChangeText={(url) => this.setState({url})}> 
                </TextInput>
                <TouchableHighlight onPress={this._onSubmit.bind(this)} underlayColor='lightblue'>
                    <View>
                        <Text>Save Link</Text>
                    </View>
                </TouchableHighlight>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 5
    }
})


export default AddLink;
