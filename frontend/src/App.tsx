import React from 'react';
import TodoItem from './Components/TodoItem';
import TodoList from './Components/TodoList';

const App = () => {

  const [todoItems, setTodo] = React.useState<Array<typeof TodoItem>>(new Array<typeof TodoItem>());

  if (todoItems.length === 0) {
    for (let i = 0; i < 10; i++) {
      todoItems.push(TodoItem);
    }
  }

  const popItems = () => {
    let newTodoItems = [...todoItems];
    newTodoItems.pop();
    setTodo(newTodoItems);
  }

  return (
    <div>
      <h1>
        {TodoList({ todoItems: todoItems, handlePop: popItems })}
      </h1>
    </div>
  );

}

export default App;
