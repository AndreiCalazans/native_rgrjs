import  {
    commitMutation,
    graphql
} from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import environment from './createRelayEnvironment';

const mutation = graphql`
    mutation DeleteLinkMutation($input: deleteLinkInput!) {
     deleteLink(input: $input) {
         deletedId
     }   
}
`;

function sharedUpdater(proxyStore , viewerId , deletedId){
     const viewerProxy = proxyStore.get(viewerId);
        const connection = ConnectionHandler.getConnection(viewerProxy, 'Main_linkConnection');
        if (connection) {
            ConnectionHandler.deleteNode(connection, deletedId);
        }
}

export default (postId, viewerId) => {
    const variables = {
        input:{
          id: postId,
          clientMutationId: ''
        }
    };
    commitMutation(
        environment,
        {
            mutation,
            variables,
            onError: err => console.error(err),
            optimisticUpdater: (proxyStore) => {
            
                sharedUpdater(proxyStore, viewerId, postId);

            },
            updater: (proxyStore) => {
                const deletePostField = proxyStore.getRootField('deleteLink');
                const deletedId = deletePostField.getValue('deletedId');
            
                sharedUpdater(proxyStore, viewerId, deletedId);
            },
        },
    )
}