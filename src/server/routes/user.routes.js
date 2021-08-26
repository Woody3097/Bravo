const Router = require("express");
const router = new Router();
const userController = require("../controllers/user.controller");

router.post("/usersRegister", userController.addUser);
router.post("/usersLogin", userController.getUser);
router.post("/usersVerification", userController.verification);
router.post("/tokenExpired", userController.tokenExpired);
router.post("/customerId", userController.getCustomerId);

module.exports = router;
