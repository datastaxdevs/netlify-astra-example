import React, { Component } from "react";
import Todo from "./Todo";
import Footer from "./Footer";

const TODO_FILTERS = {
  SHOW_ALL: () => true,
  SHOW_ACTIVE: (todo) => !todo.completed,
  SHOW_COMPLETED: (todo) => todo.completed,
};

export default class TodoList extends Component {
  state = { filter: "SHOW_ALL" };
  

  handleClearCompletedDoc = () => {
    this.props.actions.clearCompletedDoc();
  };

  handleShow = (filter) => {
    this.setState({ filter });
  };

  renderToggleDocAll(completedCount) {
    const { todos, actions } = this.props;
    if (todos.length > 0) {
      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={actions.completeDocAll}
        />
      );
    }
  }

  renderDocFooter(completedCount) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompletedDoc.bind(this)}
          onShow={this.handleShow.bind(this)}
        />
      );
    }
  }

  componentDidMount() {
    this.props.actions.getDocTodos().then(docTodos => {this.setState({ docTodos })});
    this.props.actions.getRestTodos().then(restTodos => {this.setState({ restTodos })});
    
  }

  render() {
    const { todos, actions, type } = this.props;
    const { filter } = this.state;
    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce((count, todo) => {
      return todo.completed ? count + 1 : count;
    }, 0);

    if (!todos.length) {
      return (
        <section className="main">
            <ul className="todo-list"></ul>
        </section>
      )
    }

    return (
      <section className="main">
        {this.renderToggleDocAll(completedCount)}
          <ul className="todo-list">
            {filteredTodos.map((todo) => (
              <Todo type={type} key={todo.id} todo={todo} {...actions} />
            ))}
          </ul>

        {this.renderDocFooter(completedCount)}
      </section>
    );
  }
}
