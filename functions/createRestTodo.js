const { getRestClient } = require("./utils/astraRestClient");
exports.handler = async (event, context) => {
  const todos = await getRestClient();
  const keyspace = 'rest';
  const body = JSON.parse(event.body);
  console.log(event.body)
  console.log(event)

  try {
    const { data, status} = await todos.post('/api/rest/v2/schemas/keyspaces/todos/tables/rest', event.body);
    console.log(JSON.stringify(data))
    console.log("STATUS" + JSON.stringify(status))
    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (e) {
    console.log("ERRPR: " + JSON.stringify(e))
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};
