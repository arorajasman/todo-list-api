const Router = require("koa-router");

const todosController = require("../controllers/todos_controller");

const router = new Router();

router.get("/api/v1/todos/:userId", todosController.getAllTodosBasedOnUserId);
router.post("/api/v1/todos/:userId", todosController.createTodo);
// here id is related to todo and not to the user

// using the patch() method since it will update only the value provided by the user
router.patch("/api/v1/todos/:id",todosController.updateTodo);
router.delete("/api/v1/todos/:id",todosController.deleteTodoById);

module.exports = router;
