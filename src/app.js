import React, { Component } from "react";
import Header from "./Header";
import TodoList from "./TodoList";
import api from "./utils/api";
import uuid from "node-uuid";
import { Hook, Console, Decode } from 'console-feed';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restTodos: [],
      docTodos: [],
      GQTodos: [],
      logs: [],
    };
  }

  addDocTodo = (text) => {
    api
      .createDocTodo({
        id: uuid.v1(),
        completed: false,
        text: text,
      })
      let docTodos = api.getDocTodos();
      this.setState({ docTodos });
  };

  addRestTodo = async (text) => {
    await api
      .addRestTodo({
        id: uuid.v1(),
        completed: false,
        text: text,
        key: "todo"
      })
      let restTodos = await api.getRestTodos();
      this.setState({ restTodos });
  };

  deleteDocTodo = async (id) => {
    await api.deleteDocTodo(id);
    let docTodos = await api.getDocTodos();
    this.setState({ docTodos });
  };

  deleteRestTodo = async (id) => {
    await api.deleteRestTodo(id);
    let restTodos = await api.getRestTodos();
    this.setState({ restTodos });
  };

  async editDocTodo (id, text, completed) {
    await api.updateDocTodo({
        id,
        text,
        completed,
      })
      let docTodos = await api.getDocTodos();
      this.setState({ docTodos });
  };

  completeDocTodo = async (id, text, completed) => {
    await api.updateDocTodo({
        id,
        text,
        completed: !completed,
      })
      api.getDocTodos().then((docTodos) => this.setState({ docTodos }));
  };

  completeRestTodo = async (id, text, completed) => {
    await api.updateRestTodo({
        id,
        text,
        completed: !completed
      })
      await this.getRestTodos();
  };

  componentDidMount = async () =>{
    api.getDocTodos().then((docTodos) => this.setState({ docTodos }));
    api.getRestTodos().then((restTodos) => this.setState({ restTodos }));

    Hook(window.console, log => {
      this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }))
    })
    console.log("Welcome to the todo app!")
  }

  getDocTodos = async() => {
    console.log("Getting Doc Todos")
    api.getDocTodos().then((docTodos) => this.setState({ docTodos }));
  }

  getRestTodos = async() => {
    api.getRestTodos().then((restTodos) => this.setState({ restTodos }));
  }

  async completeDocAll() { 
    api.getDocTodos().then((todos) => {
        todos.forEach(todo => { 
          this.completeDocTodo(todo.id, todo.text, false)
        })
      })
      
      return this.getDocTodos();
    }

    async clearDocCompleted()
    { let docTodos = api.getDocTodos();
          docTodos.forEach(todo => { 
            this.completeDocTodo(todo.id, todo.text, true)
          })
        
      }

  actions = {
    addDocTodo: this.addDocTodo,
    addRestTodo: this.addRestTodo,
    deleteDocTodo: this.deleteDocTodo,
    editDocTodo: this.editDocTodo,
    completeDocTodo: this.completeDocTodo,
    completeRestTodo: this.completeRestTodo,
    completeDocAll: this.completeDocAll,
    clearDocCompleted: this.clearDocCompleted,
    getDocTodos: this.getDocTodos,
    getRestTodos: this.getRestTodos,
    deleteRestTodo: this.deleteRestTodo
  };

  render() {
    return (
      <div>
      <div >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 50 }}>
          <div className = "todos">
            <Header title="Doc todos" addTodo={this.actions.addDocTodo} />
            <TodoList type="doc" todos={this.state.docTodos} actions={this.actions} />
          </div>
          <div className="todos">
            <Header title="REST todos" addTodo={this.actions.addRestTodo} />
            <TodoList type="rest" todos={this.state.restTodos} actions={this.actions} />
          </div>
          <div className="todos">
            <Header title="GQ Todos" addTodo={this.actions.addGQTodo} />
            <TodoList todos={this.state.GQTodos} actions={this.actions} />
          </div>
        </div>
      </div>
      <div>
      <div style={{ backgroundColor: '#000000', marginTop: 40 }}>
        <Console logs={this.state.logs} variant="dark" />
        </div>
      </div>
      </div>
    
    );
  }
}

export default App;
