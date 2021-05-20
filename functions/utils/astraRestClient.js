const createClient = require("@astrajs/rest")

let astraRestClient = null;
console.log("Loaded")


const getAstraRestClient = async () => {
  if (astraRestClient === null) {
    astraRestClient = await createClient(
      {
        astraDatabaseId: process.env.ASTRA_DB_ID,
        astraDatabaseRegion: process.env.ASTRA_DB_REGION,
        applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
        
      },
      30000
    );
  }
  let response = await astraRestClient.post('/api/rest/v2/schemas/keyspaces/todos/tables',
  {
    "name": "rest",
    "ifNotExists": true,
    "columnDefinitions": [
      {
        "name": "firstname",
        "typeDefinition": "text",
        "static": false
      },
      {
        "name": "lastname",
        "typeDefinition": "text",
        "static": false
      },
          {
            "name": "occupation",
            "typeDefinition": "text"
          }
    ],
    "primaryKey": {
      "partitionKey": [
        "lastname"
      ],
      "clusteringKey": [
        "firstname"
      ]
    }
  })
  console.log(response)
  return astraRestClient;
};

const getRestClient = async () => {
  if (astraRestClient === null) {
    const astraRestClient = await getAstraRestClient();
    return astraRestClient;
  };
}

module.exports = { getRestClient };
