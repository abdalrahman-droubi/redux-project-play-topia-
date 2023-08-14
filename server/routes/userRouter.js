const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const protected =require("../middleware/Protected")
const upload = require("../middleware/handleImage")


router.get("/api/users" ,protected, userController.allUsers);
router.get("/api/userNew" ,protected, userController.oneUserNew);
router.get("/api/Providers", userController.allProviders);
router.get("/api/Admins", userController.allAdmins);
router.post("/api/users", userController.newUser);
router.post("/api/usersLogin", userController.newUserLogin);
router.get("/api/users/:id", userController.oneUser);
router.put("/api/users/:id",upload.single("image"), userController.updateUser);
router.delete("/api/users/:id", userController.deleteUser);
router.put("/api/usersContactUs/:id", userController.newUserContactUs);
router.get("/api/usersMessages" , userController.usersMessages);
router.get("/protected", userController.protected);

module.exports = router;
