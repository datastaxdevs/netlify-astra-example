const getDocTodos = async () => {
  const response = await fetch(`/.netlify/functions/getDocTodos`);
  let todos = await response.json()
  return todos.length ? todos : [];
};

const createDocTodo = async (todo) => {
  const response = await fetch("/.netlify/functions/createDocTodo", {
    body: JSON.stringify(todo),
    method: "POST",
  });
  return response.json();
};

const updateDocTodo = async (todo) => {
  const response = await fetch("/.netlify/functions/updateDocTodo", {
    body: JSON.stringify(todo),
    method: "PUT",
  });
  return response.json();
};

const deleteDocTodo = async (id) => {
  const response = await fetch("/.netlify/functions/deleteDocTodo", {
    body: JSON.stringify({ id }),
    method: "POST",
  });
  return response.json();
};

const getRestTodos = async () => {
  const response = await fetch(`/.netlify/functions/getRestTodos`);
  let todos = await response.json()
  return todos.length ? todos : [];
};

const createRestTodo = async (todo) => {
  const response = await fetch("/.netlify/functions/createRestTodo", {
    body: JSON.stringify(todo),
    method: "POST",
  });
  return response.json();
};

const updateRestTodo = async (todo) => {
  const response = await fetch("/.netlify/functions/updateRestTodo", {
    body: JSON.stringify(todo),
    method: "PUT",
  });
  return response.json();
};

const deleteRestTodo = async (id) => {
  const response = await fetch("/.netlify/functions/deleteRestTodo", {
    body: JSON.stringify({ id }),
    method: "POST",
  });
  return response.json();
};


const default_export = {
  getDocTodos,
  createDocTodo,
  deleteDocTodo,
  updateDocTodo,
  getRestTodos,
  createRestTodo,
  deleteRestTodo,
  updateRestTodo
};
export default default_export;
