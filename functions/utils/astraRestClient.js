const { createClient }= require("@astrajs/rest")
const chalk = require('chalk')
let astraRestClient = null;

const requestWithRetry = async (url, client) => {
  const MAX_RETRIES = 20;
  for (let i = 1; i <= MAX_RETRIES; i++) {
    try {
      let response = await client.get(url);
      return response
    } catch(e) {
      const timeout = 500 * i * 10;
      console.log(chalk.blue('         ... waiting', timeout, 'ms'));
      await wait(timeout);
    }
  }
}

function wait(timeout) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, timeout);
	});
}

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
    const tables = await astraRestClient.get('/api/rest/v2/schemas/keyspaces/todos/tables')
    const results = tables.data.filter(entry => entry.name === "rest");
    if (!results.length) {
      createTable("rest")
    }
  }
  return astraRestClient;
};

async function createTable(name) {
  let response = await astraRestClient.post('/api/rest/v2/schemas/keyspaces/todos/tables',
  {
    "name": "rest",
    "ifNotExists": true,
    "columnDefinitions": [
      {
        "name": "id",
        "typeDefinition": "uuid",
        "static": false
      },
      {
        "name": "text",
        "typeDefinition": "text",
        "static": false
      },
      {
        "name": "key",
        "typeDefinition": "text",
        "static": false
      },
          {
            "name": "completed",
            "typeDefinition": "boolean"
          }
    ],
    "primaryKey": {
      "partitionKey": [
        "id"
      ]
    }
  })
  response = await astraRestClient.post('/api/rest/v2/schemas/keyspaces/todos/tables/rest/indexes',
  {
    "column": "key",
    "name": "key_idx",
    "ifNotExists": true
  }
  );
  
}

const getRestClient = async () => {
  if (astraRestClient === null) {
    const astraRestClient = await getAstraRestClient();
    return astraRestClient;
  };
  return astraRestClient;
}

module.exports = { getRestClient, requestWithRetry, wait };
