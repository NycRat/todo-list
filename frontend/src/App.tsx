import React from 'react';
import Navbar from './Components/NavBar';
import TodoList from './Components/TodoList';
import { ITodoItem } from './Components/TodoItem'
import './Scss/components.scss'

const App = (): JSX.Element => {

  const [todoItems, setTodo] = React.useState<Array<ITodoItem>>(new Array<ITodoItem>());
  const [curTodoInfo, setCurTodoInfo] = React.useState<ITodoItem>({ name: '', id: 0 });

  const handleDelete = (item: ITodoItem): void => {
    let newTodoItems = [...todoItems];
    for (let i = 0; i < newTodoItems.length; i++) {
      if (newTodoItems[i].id === item.id && newTodoItems[i].name === item.name) {
        newTodoItems.splice(i, 1);
        break;
      }
    }
    setTodo(newTodoItems);
  }

  const handleAddTodoItem = (item: ITodoItem): void => {
    let newTodoItems = [...todoItems];
    newTodoItems.push(item);
    setTodo(newTodoItems);
  }

  const handleUpdateCurTodoItem = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurTodoInfo({ name: event.target.value, id: 0 });
  }

  const handleSubmitNewTodoItem = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (curTodoInfo.name === '') {
      return;
    }
    handleAddTodoItem(curTodoInfo);
    // setCurTodoInfo({ name: '', id: 0 });
  }

  return (
    <div>
      {Navbar()}
      <div className='app'>
        <h2>
          <form onSubmit={(e) => handleSubmitNewTodoItem(e)}>
            <label>
              New Todo Item: <input type="text" name="name" onChange={(e) => { handleUpdateCurTodoItem(e) }} />
            </label>
            <input type='submit' name='ADD' />
          </form>
          {TodoList({ todoItems: todoItems, onDelete: handleDelete })}
        </h2>
      </div>
    </div >
  );

}

export default App;
