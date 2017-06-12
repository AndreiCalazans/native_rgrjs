import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
    createFragmentContainer,
    graphql
} from 'react-relay';
// use it to delay function call
import {debounce} from 'lodash';
import Link from './Link';

// const mockData = [
//     { 
//         node: {
//         title: 'google',
//         url: 'www.google.com',
//         createdAt: new Date()
//     }
// },
//  { 
//         node: {
//         title: 'google',
//         url: 'www.google.com',
//         createdAt: new Date()
//     }
// },
//  { 
//         node: {
//         title: 'google',
//         url: 'www.google.com',
//         createdAt: new Date()
//     }
// }];

class Main extends React.Component {
  render() {
    console.log('mainComponent', this.props);
    let content = this.props.store.linkConnection.edges.map((item) => {
      return <Link key={item.node.id} link={item.node} />
    });
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text>List of Cool Links</Text>
        </View>
       {content} 
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
    
    container: {
        flex:1,
        padding: 5,
        margin: 5
    }
})

export default createFragmentContainer( Main, graphql`
    fragment Main_store on Store {
        id,
        linkConnection {
            edges {
                node {
                    id,
                    ...Link_link
                }
            }
        }
    }  
`);