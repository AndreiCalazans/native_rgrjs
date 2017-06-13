import React from 'react';
import {View, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import {
    QueryRenderer,
    graphql
} from 'react-relay';
import CreateLinkMutation from '../CreateLinkMutation';
import Environment from '../createRelayEnvironment';



const AddLinkViewerQuery = graphql`
    query AddLinkViewerQuery {
        store {
            id
        }
    }
`


class AddLink extends React.Component{
    constructor(props) {
        super(props);
        this.state = {title: '', url: ''}
    }

    static navigationOptions = {
        title: 'Add a Link'
    }

    _onSubmit(viewerId) {
        // console.log(this.state.title , this.state.url)
        const {title , url } = this.state;
        CreateLinkMutation(title, url, viewerId, () => this.props.navigation.navigate('LinkList'))
    }
    render() {
        return (
            <QueryRenderer
                environment={Environment}
                query={AddLinkViewerQuery}
                render={ ({error, props}) => {
                    if (error) {
                        return <Text>{error.message}</Text>
                    } else if (props) {
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
                                <TouchableHighlight onPress={() => this._onSubmit(props.store.id)} underlayColor='lightblue'>
                                    <View style={styles.btn}>
                                        <Text style={{textAlign: 'center'}}>Save Link</Text>
                                    </View>
                                </TouchableHighlight>
                             </View>
                        )
                    }
                    return <Text>Loading...</Text>
                }}
             />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 5
    },
    btn: {
        backgroundColor: 'lightblue',
        padding: 10,
        margin: 10
    }
})


export default AddLink;