const express = require("express");
const router = express.Router();

const Post = require("../models/post");

router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Post added successfully",
        postId: result._id,
      });
    })
    .catch((err) => console.log(err));
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    _id: req.body.id,
  });
  Post.updateOne({ _id: req.params.id }, post).then((response) => {
    res.status(200).json({ message: "Update Successfull" });
  });
});

router.get("", (req, res, next) => {
  Post.find().then((data) => {
    res.status(200).json({
      message: "Posts fetched succesfully!",
      posts: data,
    });
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({ message: "Post deleted!" });
  });
});

router.get("/:id", (req, res, next) => {
  return Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

module.exports = router;
