import {
    commitMutation,
    graphql
} from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import environment from './createRelayEnvironment';

const mutation = graphql`
    mutation CreateLinkMutation($input: CreateLinkInput!) {
        createLink(input: $input) {
            clientMutationId,
            linkEdge {
                node {
                    url,
                    title
                }
            }
        }
    }
`

function sharedUpdater(proxyStore , viewerId , newLink){
     const viewerProxy = proxyStore.get(viewerId);
     console.log('sharedUpdater:',viewerProxy);
     const connection = ConnectionHandler.getConnection(viewerProxy, 'Main_links');
     // connection is returning undefined
     console.log('passed the connection: ', connection);
     ConnectionHandler.insertEdgeAfter(connection, newLink);
}
let tempID = 0;

export default (title, url, viewerId, callback) => {
    const variables = {
        input: {
            title,
            url,
            clientMutationId: ""
        },
    }

    commitMutation(
        environment,
        {
            mutation,
            variables,
            optimisticUpdater: (proxyStore) => {
                // create a new Link as a mock that can be added to the store
                const id = 'client:newLink' + tempID++;
                const newLink = proxyStore.create(id, "linkEdge");
                newLink.setValue(id, 'id');
                newLink.setValue(title, 'title');
                newLink.setValue(url, 'url');
                const newEdge = proxyStore.create(
                    'client:newEdge:' + tempID++ , 
                    'linkEdge',
                );
        
                newEdge.setLinkedRecord(newLink , 'node');
                // add new link to the store
                console.log('optimistic', newEdge);
               sharedUpdater(proxyStore, viewerId , newEdge);

            },
            updater: (proxyStore) => {
                // retieve the newLink from the server response
                const createLinkField = proxyStore.getRootField('createLink');
                console.log('updater', createLinkField); 
                const newLink = createLinkField.getLinkedRecord('linkEdge');

                // add newLink to the store
              sharedUpdater(proxyStore , viewerId, newLink);
            },
            onCompleted: () => {
                callback()   
            },
            onError: err => console.error(err),
        }
    )
}