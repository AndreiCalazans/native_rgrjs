import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
    createFragmentContainer,
    graphql
} from 'react-relay';
import Link from './Link';

class Main extends React.Component {
  render() {
    console.log('mainComponent', this.props);
    let content = this.props.store.linkConnection.edges.map((item) => {
      return <Link key={item.node.id} link={item.node} store={this.props.store} />
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
        ...Link_store,
        id,
        linkConnection(first: 2147483647) @connection(key:"Main_linkConnection", filters: []) {
            edges {
                node {
                    id,
                    ...Link_link
                }
            }
        }
    }  
`);