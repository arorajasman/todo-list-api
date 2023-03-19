const Router = require("koa-router");

const userController = require("../controllers/user_controller");

const router = new Router();

router.get("/api/v1/users", userController.getListOfUsers);
router.get("/api/v1/users/:id", userController.getDetailsOfUserBasedOnId);
router.post("/api/v1/users",userController.createNewUser);
router.delete("/api/v1/users/:id",userController.deleteUserById);
router.patch("/api/v1/users/:id",userController.updateDetailsOfUserBasedOnId);

module.exports = router;
