const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime')


function fetchQuery( operation, variables) {
//url to external device on same network

  return fetch('http://10.0.0.103:5000/graphql', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(res => {
      return res.json()
  }).catch(res => {
    console.log(res);
    return res
  })
}

const network = Network.create(fetchQuery)

const source = new RecordSource()
const store = new Store(source)

export default new Environment({
  network,
  store,
})
