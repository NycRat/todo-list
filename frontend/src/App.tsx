import React from 'react';
import Navbar from './Components/NavBar';
import TodoList from './Components/TodoList';
import { HashRouter, Route, Routes } from 'react-router-dom';
import LoginPage, { LoginInfo } from './Components/LoginPage';
import { serverAddTodoItem, serverDeleteTodoItem, serverLogin, serverGetTodoItems, serverAddNewUser } from './serverFunctions';

const App = (): JSX.Element => {

  const [todoItems, setTodoList] = React.useState<Array<string>>(new Array<string>());
  const [curTodoInfo, setCurTodoInfo] = React.useState<string>('');
  const [loginInfo, setLoginInfo] = React.useState<LoginInfo>({ username: '', password: '' });

  const handleDelete = (index: number): void => {
    let newTodoItems = [...todoItems];
    newTodoItems.splice(index, 1);
    setTodoList(newTodoItems);
    serverDeleteTodoItem(loginInfo, index);
  }

  const handleAddTodoItem = (item: string): void => {
    let newTodoItems = [...todoItems];
    newTodoItems.push(item);
    setTodoList(newTodoItems);
  }

  const handleUpdateCurTodoItem = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurTodoInfo(event.target.value);
  }

  const handleSubmitNewTodoItem = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (curTodoInfo === '') {
      return;
    }
    handleAddTodoItem(curTodoInfo);
    if (loginInfo.username !== '') {
      serverAddTodoItem(loginInfo, curTodoInfo);
    }
  }

  const handleLoginTry = async (newLoginInfo: LoginInfo): Promise<void> => {
    if (await serverLogin(newLoginInfo)) {
      setLoginInfo(newLoginInfo);
      setTodoList(await serverGetTodoItems(newLoginInfo));
    }
  }

  const handleSignupTry = async (signupInfo: LoginInfo): Promise<void> => {
    if (await serverAddNewUser(signupInfo)) {
      await handleLoginTry(signupInfo);
    }
  }

  return (
    <div>
      {Navbar()}
      <HashRouter>
        <Routes>
          <Route path='/' element={
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
          }>
          </Route>
          <Route path='/login' element={LoginPage({ handleLogin: handleLoginTry, handleSignup: handleSignupTry })}>
          </Route>
          <Route path='*' element={
            <h1>
              404 page not found
            </h1>
          }>
          </Route>
        </Routes>
      </HashRouter>
    </div >
  );

}

export default App;
