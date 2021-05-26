const getDocTodos = async () => {
  console.log('%cGetting Doc Todos', 'color: cyan; font-size: x-large');
  console.log('%cDOC: GET ', 'color: cyan; font-size: x-large');
  
  const response = await fetch(`/.netlify/functions/getDocTodos`);
  let todos = await response.json()
  console.table(todos, 'color: cyan; font-size: x-large')
  return todos.length ? todos : [];
};

const createDocTodo = async (todo) => {
  console.log('%cCreating a new Doc Todo', 'color: cyan; font-size: x-large');
  console.log(todo)
  const response = await fetch("/.netlify/functions/createDocTodo", {
    body: JSON.stringify(todo),
    method: "POST",
  });
  console.log(response.json())
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

const getGQTodos = async () => {
  const response = await fetch(`/.netlify/functions/getGQTodos`);
  console.log("GRAPHQL: /api/graphql/todos")
  let todos = await response.json()
  return todos.length ? todos : [];
};

const getRestTodos = async () => {
  const response = await fetch(`/.netlify/functions/getRestTodos`);
  let todos = await response.json()
  return todos.length ? todos : [];
};

const addGQTodo = async (todo) => {
  const response = await fetch("/.netlify/functions/createGQTodo", {
    body: JSON.stringify(todo),
    method: "POST",
  });
  return response.json();
};

const addRestTodo = async (todo) => {
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
  getGQTodos,
  addGQTodo,
  createDocTodo,
  deleteDocTodo,
  updateDocTodo,
  getRestTodos,
  addRestTodo,
  deleteRestTodo,
  updateRestTodo
};
export default default_export;
