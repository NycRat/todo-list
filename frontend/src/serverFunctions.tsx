import axios from "axios";
import { LoginInfo } from "./Components/LoginPage";

const url = 'https://todo-list-server-0.herokuapp.com';

export const serverLogin = async (loginInfo: LoginInfo): Promise<boolean> => {
  let success = false;
  await axios.get(url + '/login', { params: { loginInfo: loginInfo } }).then((res) => {
    console.log(res['data']);
    success = res['data']['success'];
  });
  return success;
}

export const serverAddNewUser = async (loginInfo: LoginInfo): Promise<boolean> => {
  let success = false;
  await axios.post(url + '/login', { loginInfo: loginInfo }).then((res) => {
    console.log(res['data']);
    success = res['data']['success'];
  });
  return success;
}

export const serverAddTodoItem = async (loginInfo: LoginInfo, todoItem: string): Promise<boolean> => {
  let success = false;

  await axios.post(url + '/todoItems', { loginInfo: loginInfo, todoItem: todoItem }).then((res) => {
    console.log(res['data']);
    success = res['data']['success'];
  });
  return success;
}

export const serverGetTodoItems = async (loginInfo: LoginInfo): Promise<Array<string>> => {
  let items: Array<string> = [];
  await axios.get(url + '/todoItems', { params: { loginInfo: loginInfo } }).then((res) => {
    console.log(res['data']);
    items = res['data']['data'];
  });
  return items;
}

export const serverDeleteTodoItem = async (loginInfo: LoginInfo, index: number): Promise<boolean> => {
  let success = false;
  await axios.delete(url + '/todoItems', { params: { loginInfo: loginInfo, index: index } }).then((res) => {
    // await axios.delete(url + '/todoItems' ).then((res) => {
    console.log(res['data']);
    success = res['data']['success'];
  });
  return success;
}