const { getCollection } = require("./utils/astraClient");

exports.handler = async (event, context) => {
  const todos = await getCollection();
  try {
    const res = await todos.find({});
    const formattedTodos = Object.keys(res).map((item) => res[item]);
    console.log("FormattedTodos: " + JSON.stringify(formattedTodos))
    return {
      headers: '{Content-Type: application/json}',
      statusCode: 200,
      body: JSON.stringify(formattedTodos),
      headers: {
        'Content-Type': 'application/json'
      },
    };
  } catch (e) {

    console.log("getDocTodos ERROR: " + e)
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};