import express from "express";
import { apiAddNewUser, apiAddTodoItem, apiDeleteTodoItem, apiGetTodoList, apiLogin, LoginInfo } from "./Server";

const router = express.Router();

router.
  route("/todoItems")
  .post(async (req, res) => {
    try {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-type', 'application/json');
      res.json(await apiAddTodoItem(req.body['loginInfo'], req.body['todoItem']));
    } catch (ex) {
      res.status(404).json({ error: 'invalid request' });
    }
  })
  .get(async (req, res) => {
    try {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-type', 'application/json');
      if (typeof req.query['loginInfo'] === 'string') {
        res.json(await apiGetTodoList(JSON.parse(req.query['loginInfo'])));
      }
    } catch (ex) {
      res.status(404).json({ error: 'invalid request' });
    }
  })
  .delete(async (req, res) => {
    try {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-type', 'application/json');
      if (typeof req.query['loginInfo'] === 'string' && typeof req.query['index'] === 'string') {
        res.json(await apiDeleteTodoItem(JSON.parse(req.query['loginInfo']), parseInt(req.query['index'])));
      }
    } catch (ex) {
      res.status(404).json({ error: 'invalid request' });
    }
  });

router
  .route('/login')
  .get(async (req, res) => {
    try {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-type', 'application/json');
      if (typeof req.query['loginInfo'] === 'string') {
        res.json(await apiLogin(JSON.parse(req.query['loginInfo'])));
      }
    } catch (ex) {
      res.status(404).json({ error: 'invalid request' });
    }
  })
  .post(async (req, res) => {
    try {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-type', 'application/json');
      res.json(await apiAddNewUser(req.body['loginInfo']));
    } catch (ex) {
      res.status(404).json({ error: 'invalid request' });
    }
  });

// router
//   .route("/something")
//   .get()
//   .post()
//   .put()
//   .delete()

export default router;