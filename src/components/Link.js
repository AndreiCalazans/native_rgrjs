import React from 'react';
import {
    createFragmentContainer,
    graphql
} from 'react-relay';
import { View, Text, StyleSheet, Button } from 'react-native';
import moment from 'moment';

import DeleteLinkMutation from '../DeleteLinkMutation';


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
                <Button key='4' onPress={this._handleDelete} title='Delete' underlayColor='red' /> 
                ]}         
            </View>
        )
    }

    _handleDelete = () => {
        console.log('handledelete: ', this.props);
    DeleteLinkMutation(this.props.link.id, this.props.store.id );
    }
}


export default createFragmentContainer( Link, graphql`
    fragment Link_store on Store {
        id
    }
    fragment Link_link on Link {
            id,
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
