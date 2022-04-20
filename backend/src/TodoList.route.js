import express from "express";

const router = express.Router();

router.route("/").get((req, res) => {
  res.json({ woah: 'works' });
});

// router
//   .route("/something")
//   .post()
//   .put()
//   .delete()

export default router;