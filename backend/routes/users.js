const router = require("express").Router();
const User = require("../models/User");
const fs = require("fs");
const multer = require("multer");

//multer logic to save pic in a folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/users");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
  size: 10485760, //10MB Limit
});
const upload = multer({ storage: storage });

//update user
router.put(
  "/:id",
  upload.fields([{ name: "coverPicture" }, { name: "profilePicture" }]),
  async (req, res) => {
    try {
      if (req.params.id !== req.body.userId) {
        return res.status(401).send({ msg: "you can not update this profile" });
      }
      let data = await User.findById(req.params.id);
      if (data) {
        data.desc = req.body.desc;
        data.from = req.body.from;
        data.city = req.body.city;
        data.relationship = req.body.relationship;
        if (req.files.coverPicture) {
          try {
            fs.unlinkSync("public/uploads/users/" + data.coverPicture);
          } catch (error) {}
          data.coverPicture = req.files.coverPicture[0].filename;
        }
        if (req.files.profilePicture) {
          try {
            fs.unlinkSync("public/uploads/users/" + data.profilePicture);
          } catch (error) {}
          data.profilePicture = req.files.profilePicture[0].filename;
        }
        await data.save();
        res.send({ success: true, data: data });
      } else {
        res.status(404).send({ msg: "user record not find" });
      }
    } catch (error) {
      res.status(500).send({ msg: "server error" });
    }
  }
);

// delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.send({ success: "account has been deleted!" });
    } catch (error) {
      res.status(500).send({ msg: "server error" });
    }
  } else {
    return res.status(401).send({ msg: "you can only update your profile !" });
  }
});

//get user details
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.send({ success: true, user: other });
  } catch (error) {
    res.status(500).send({ msg: "something went wrong !" });
  }
});
// follow a user if you want to !
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.send({ success: "user has been followed !" });
      } else {
        res.status(403).send({ msg: "you already follow this user !" });
      }
    } catch (error) {
      res.status(500).send({ msg: "server error" });
    }
  } else {
    res.status(403).send({ msg: "you can not follow your own account !" });
  }
});
// unfollow a user if you want to !
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.send({ success: "user has been unfollowed !" });
      } else {
        res.status(403).send({ msg: "you don't  follow this user !" });
      }
    } catch (error) {
      res.status(500).send({ msg: "server error" });
    }
  } else {
    res
      .status(403)
      .send({ msg: "you can not follow or unfollow your own account !" });
  }
});

//get a user following detials
router.get("/followings/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const followings = await Promise.all(
      user.followings.map((list) => {
        return User.findById(list);
      })
    );
    let List = [];
    followings.map((friend) => {
      const { _id, username, profilePicture } = friend;
      List.push({ _id, username, profilePicture });
    });
    res.send({ success: true, data: List });
  } catch (error) {
    res.status(500).send({ msg: "server errro" });
  }
});

//get a user's followes details
router.get("/followers/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const followers = await Promise.all(
      user.followers.map((list) => {
        return User.findById(list);
      })
    );
    let Lists = [];
    followers.map((friend) => {
      const { _id, username, profilePicture } = friend;
      Lists.push({ _id, username, profilePicture });
    });
    res.send({ success: true, data: Lists });
  } catch (error) {
    res.status(500).send({ msg: "server errro" });
  }
});

//get user's friend list
router.get("/friendlist/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    let friendlist = user.followings.filter((item) =>
      user.followers.includes(item)
    );
    if (friendlist.length === 0) {
      return res.send({ success: true, msg: "no friend", data: friendlist });
    }

    let frienddetails = await Promise.all(
      friendlist.map((frndid) => {
        return User.findById(frndid);
      })
    );
    let Lists = [];
    frienddetails.map((friend) => {
      const { _id, username, profilePicture } = friend;
      Lists.push({ _id, username, profilePicture });
    });
    res.send({ success: true, data: Lists });
  } catch (error) {
    res.status(500).send({ msg: "server errro" });
  }
});

module.exports = router;
