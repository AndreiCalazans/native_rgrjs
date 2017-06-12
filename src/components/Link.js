import React from 'react';
import {
    createFragmentContainer,
    graphql
} from 'react-relay';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';



class Link extends React.Component {
    render() {
        const {link} = this.props;
        return (
            <View style={styles.container}>
                {[
                <Text key='1'>
                {link.title}
                </Text>,      
                 <Text key='2'>
                {link.url}
                 </Text>,
                 <Text key='3'>
                   {link.createdAt}
                </Text>  , 
                <Text key='4' onPress={this._handleDelete}>
                    Delete
                </Text> 
                ]}         
            </View>
        )
    }

    _handleDelete = () => {
       
    }
}


export default createFragmentContainer( Link, graphql`
    fragment Link_link on Link {
            url,
            title,
            createdAt
    }
`);

const styles = StyleSheet.create({
    container: {
        padding: 5,
        margin: 10,
        borderColor: 'black',
        borderWidth: 2
    }
})
