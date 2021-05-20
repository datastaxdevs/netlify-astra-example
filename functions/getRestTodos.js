const { getRestClient } = require("./utils/astraRestClient");

exports.handler = async (event, context) => {
  const client = await getRestClient();
  try {
    const res = await client.get('/api/rest/v2/keyspaces/todos/rest')
    console.log(res)
    const formattedTodos = Object.keys(res).map((item) => res[item]);
    return {
      headers: '{Content-Type: application/json}',
      statusCode: 200,
      body: JSON.stringify(formattedTodos),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};