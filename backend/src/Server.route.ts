import express from "express";
import { apiAddNewUser, apiAddTodoItem, apiGetTodoList, apiLogin } from "./Server";

const router = express.Router();

router.route("/")
  .post(async (req, res) => {
    res.json(await apiAddTodoItem({ username: 'ERIC', password: 'woah323' }, 'woah'));
  })
  .get(async (req, res) => {
    // res.json(await apiLogin({ username: 'ERIC', password: 'woah323' }));
    res.json(await apiGetTodoList({ username: 'ERIC', password: 'woah323' }));
    // res.json(await apiAddNewUser({ username: 'erea', password: 'new PAss' }));
    // res.json(await apiLogin({ username: 'WOAH', password: 'PLEASE' }));
  });


// router
//   .route("/something")
//   .get()
//   .post()
//   .put()
//   .delete()

export default router;