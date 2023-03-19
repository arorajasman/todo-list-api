// method below is used to get the list of all the todos based on the userId
exports.getAllTodosBasedOnUserId = async (ctx) => {
  try {
    const userId = ctx.params.userId;
    const todosList = await ctx.db.Todos.findAll({
      where: {
        UserId: userId,
      },
    });

    ctx.body = {
      data: todosList,
    };
  } catch (err) {
    ctx.throw(500, err);
  }
};

// method below is used to create a todo based on the userId
exports.createTodo = async (ctx) => {
  try {
    const userId = ctx.params.userId;
    let { title, isDone } = ctx.request.body;

    // if the value of isDone is not found then setting the value of isDone as
    // false
    if (!isDone) {
      isDone = false;
    }

    const userData = await ctx.db.Users.findOne({
      where: {
        id: userId,
      },
    });

    if (!userData) {
      ctx.status = 404;
      return (ctx.body = {
        error: `No User found with id ${userId}`,
      });
    }

    const todoData = await ctx.db.Todos.create({
      title: title,
      isDone: isDone,
      UserId: userId,
    });

    if (!todoData) {
      ctx.status = 400;
      return (ctx.body = {
        error: "Unable to create the todo",
      });
    }

    ctx.body = {
      message: "Todo created successfully",
      data: todoData,
    };
  } catch (err) {
    ctx.throw(500, err);
  }
};

// method below is used to update the details of a todo item
exports.updateTodo = async (ctx) => {
  try {
    const todoId = ctx.params.id;
    const { title, isDone } = ctx.request.body;

    const todoData = await ctx.db.Todos.findOne({
      where: {
        id: todoId,
      },
    });

    if (!todoData) {
      ctx.status = 404;
      return (ctx.body = {
        error: `No Todo found with id ${todoId}`,
      });
    }

    const result = await ctx.db.Todos.update(
      {
        title: title,
        isDone: isDone,
      },
      {
        where: {
          id: todoId,
        },
      }
    );

    console.log(`value of result is: ${result}`);

    if (result == 0) {
      ctx.status = 400;
      return (ctx.body = {
        error: "Unable to update the details of the todo",
      });
    }

    ctx.body = {
      message: "Todo Updated successfully",
    };
  } catch (err) {
    ctx.throw(500, err);
  }
};

// method to delete todo based on id of todo provided by the user
exports.deleteTodoById = async (ctx) => {
  try {
    const todoId = ctx.params.id;

    const todoData = await ctx.db.Todos.findOne({
      where: {
        id: todoId,
      },
    });

    if (!todoData) {
      ctx.status = 404;
      return (ctx.body = {
        error: `No Todo item found with id ${todoId}`,
      });
    }

    const result = await ctx.db.Todos.destroy({
      where: {
        id: todoId,
      },
    });

    console.log(`Value of result is: ${result}`);

    if (result == 0) {
      ctx.status = 404;
      return (ctx.body = {
        error: `Unable to delete todo item associated with id ${todoId}`,
      });
    }

    ctx.body = {
      message: "Todo item deleted successfully",
    };
  } catch (err) {
    ctx.throw(500, err);
  }
};
