const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//add post or create posts
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.send({ success: "post created", savedPost });
  } catch (error) {
    res.status(500).send({ msg: "server errror !" });
  }
});

// update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.send({ success: "post has been updated" });
    } else {
      res.status(401).send({ msg: "you can not update other's post !" });
    }
  } catch (error) {
    res.status(500).send({ msg: "server error !" });
  }
});

// delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.send({ success: "post has been deleted" });
    } else {
      res.status(401).send({ msg: "you can not delete other's post !" });
    }
  } catch (error) {
    res.status(500).send({ msg: "server error !" });
  }
});

// like a post or dislike a post
router.put("/:id/dislike", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.send({ success: "you liked this post" });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.send({ success: "you disliked this post" });
    }
  } catch (error) {
    res.status(500).send({ msg: "server error !" });
  }
});

// get post from timeline that means your friends post
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.send(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).send({ msg: "server error !" });
  }
});

// get single user post
router.get("/singleuserpost/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    res.send(userPosts);
  } catch (error) {
    res.status(500).send({ msg: "server error !" });
  }
});

module.exports = router;
