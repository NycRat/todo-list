import express from 'express';
import router from './Server.route';
import cors from 'cors';
import mongodb from 'mongodb';
import { createKey, decryptPassword, encryptPassword } from './Password';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env['PORT'] ?? 5000;
const DATABASE_URI = process.env['DATABASE_URI'] ?? '';

const client = new mongodb.MongoClient(DATABASE_URI,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500
    // useNewUrlParser: true
  });

client.connect();


const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));


export interface LoginInfo {
  username: string,
  password: string
}

export interface Status {
  success: boolean,
  msg: string
}

export const apiAddNewUser = async (loginInfo: LoginInfo): Promise<Status> => {
  const usersCollection = client.db('LoginInfo').collection('Users');

  if (await usersCollection.findOne({ Username: loginInfo.username }) !== null) {
    return { success: false, msg: 'user already exist' };
  }

  const key = createKey();
  const newUserInfo = { Username: loginInfo.username, Password: encryptPassword(loginInfo.password, key), Key: key };
  await usersCollection.insertOne(newUserInfo);

  const todoCollection = client.db('Todo-List-DB').collection('Users');
  const newTodo = { Username: loginInfo.username, TodoItems: [] };
  await todoCollection.insertOne(newTodo);

  return { success: true, msg: 'user inserted' };
}

export const apiLogin = async (loginInfo: LoginInfo): Promise<Status> => {
  let returnStatus: Status = { success: false, msg: 'database error' };
  await client.db('LoginInfo').collection('Users').findOne({ Username: loginInfo.username }).then((item) => {
    if (item === null) {
      returnStatus = { success: false, msg: 'username not found: ' + loginInfo.username };
      return;
    }

    if (decryptPassword(item!['Password'], item!['Key']) === loginInfo.password) {
      returnStatus = { success: true, msg: 'login success' };
      return;
    } else {
      returnStatus = { success: false, msg: 'wrong password' };
      return;
    }
  });
  return returnStatus;
}

export const apiAddTodoItem = async (loginInfo: LoginInfo, todoItem: string): Promise<Status> => {
  let returnStatus: Status = { success: false, msg: 'database error' };
  if (!await apiLogin(loginInfo)) {
    return { success: false, msg: 'login failure' };
  }
  const collection = client.db('Todo-List-DB').collection('Users');
  await collection.findOne({ Username: loginInfo.username }).then(async (userInfo) => {
    if (userInfo === null) {
      returnStatus = { success: false, msg: "user not found" };
      return;
    }
    userInfo['TodoItems'].push(todoItem);
    await collection.findOneAndReplace({ Username: loginInfo.username }, userInfo);
    returnStatus = { success: true, msg: 'todo item inserted' };
  });

  return returnStatus;
}

export const apiGetTodoList = async (loginInfo: LoginInfo): Promise<{ status: Status; data: Array<string>; }> => {
  let returnStatus: Status = { success: false, msg: 'database error' };
  let returnData: Array<string> = [];
  if (!(await apiLogin(loginInfo)).success) {
    return { status: { success: false, msg: 'login failure' }, data: [] };
  }
  const collection = client.db('Todo-List-DB').collection('Users');
  await collection.findOne({ Username: loginInfo.username }).then((doc) => {
    if (doc === null) {
      returnStatus = { success: false, msg: 'database missing user todolist' };
      return;
    }
    returnStatus = { success: true, msg: 'fetched todolist data' };
    returnData = doc['TodoItems'];
  });
  return { status: returnStatus, data: returnData };
}

export const apiDeleteTodoItem = async (loginInfo: LoginInfo, index: number): Promise<Status> => {
  let returnStatus = { success: false, msg: 'database error' };
  if (!await apiLogin(loginInfo)) {
    return { success: false, msg: 'login failure' };
  }
  const collection = client.db('Todo-List-DB').collection('Users');
  await collection.findOne({ Username: loginInfo.username }).then(async (userInfo) => {
    if (userInfo === null) {
      returnStatus = { success: false, msg: "user not found" };
      return;
    }
    userInfo['TodoItems'].splice(index, 1);
    await collection.findOneAndReplace({ Username: loginInfo.username }, userInfo);
    returnStatus = { success: true, msg: 'todo item deleted' };
  });

  return returnStatus;
}

app.listen(PORT, () => { console.log(`listening on port ${PORT}`) });
