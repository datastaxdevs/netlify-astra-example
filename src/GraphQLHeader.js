import React from "react";
import TodoTextInput from "./TodoTextInput";

const Header = ({ addTodo }) => {
  const handleSave = (text) => {
    if (text.length !== 0) {
      addRESTTodo(text);
    }
  };

  return (
    <header className="header">
      <h1>GraphQL todos</h1>
      <TodoTextInput
        newTodo
        onSave={handleSave}
        placeholder="What needs to be done?"
      />
    </header>
  );
};

export default Header;
