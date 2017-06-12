import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import {
    QueryRenderer,
    graphql
} from 'react-relay';

import { StackNavigator } from 'react-navigation';
import AddLink from './components/AddLink';

// fix for android - It wasnt fetching the data properly when NOT in debug mode!!!
// link to issue https://github.com/facebook/relay/issues/1704
(function(PolyfillSet) {
  if (!PolyfillSet) {
    return;
  }
  var testSet = new PolyfillSet();
  if (testSet.size === undefined) {
    if (testSet._c.size === 0) {
      Object.defineProperty(PolyfillSet.prototype, 'size', {
        get: function() {
          return this._c.size;
        },
      });
    }
  }
})(require('babel-runtime/core-js/set').default);


import Main from './components/Main';
import environment from './createRelayEnvironment';

// must include all fragments of its children
const AppAllLinksQuery = graphql`
    query AppAllPostQuery {
        store {
            ...Main_store,
        }
    }
`;

class App extends React.Component {
    constructor(props) {
        super(props);
      
    }
    static navigationOptions =({navigation}) => ({
        title: 'Home',
        headerRight: <View style={{ margin: 5 }}><Button underlayColor='lightblue' onPress={() => navigation.navigate('AddLink') } title='Add Link'/></View>
    })

    render() {
        return (
            <View style={styles.container}>
            <Text>My app</Text>
           <QueryRenderer
                environment={environment}
                query={AppAllLinksQuery}
                render={({error, props}) => {
                    if  (error) {
                        return <Text>{error.message}</Text>
                    } else if (props) {
                        return <Main store={props.store} />
                    } else {
                        return <Text>Loading...</Text>
                    }
                }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    }
})



const RelayApp = StackNavigator(
    {
        LinkList: { screen: App },
        AddLink: { screen: AddLink }
    }
)


export default RelayApp;
