const { getCollection, getRestClient } = require("./utils/astraClient");
exports.handler = async (event, context) => {
  const todos = await getCollection();
  const body = JSON.parse(event.body);
  console.log(body)

  try {
    const res = await todos.create(body.id, body);
    let ready = await todos.find({"id":body.id})
    console.log("READY:" + ready)
    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};
