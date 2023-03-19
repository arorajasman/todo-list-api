const passwordService = require("../utils/password_service");

// method to get the list of users
exports.getListOfUsers = async (ctx) => {
  try {
    const users = await ctx.db.Users.findAll({
      // using the attributes clause and passing the exclude claus having the list
      // of columns that we need to exclude
      attributes: {
        exclude: ["password"],
      },
      // using the include and passing the model key inside the object inside
      // the array to include the todos list created by the user
      include: [
        {
          model: ctx.db.Todos,
        },
      ],
    });
    ctx.body = {
      data: users,
    };
  } catch (err) {
    ctx.throw(500, err);
  }
};

// method to get the details of user based on id
exports.getDetailsOfUserBasedOnId = async (ctx) => {
  try {
    const userId = ctx.params.id;
    const userData = await ctx.db.Users.findOne({
      where: {
        id: userId,
      },
      // using the attributes clause and passing the exclude claus having the list
      // of columns that we need to exclude
      attributes: {
        exclude: ["password"],
      },
      // using the include and passing the model key inside the object inside
      // the array to include the todos list created by the user
      include: [
        {
          model: ctx.db.Todos,
        },
      ],
    });

    if (!userData) {
      ctx.status = 404;
      return (ctx.body = {
        error: `No user found with id ${userId}`,
      });
    }

    ctx.body = {
      data: userData,
    };
  } catch (err) {
    ctx.throw(500, err);
  }
};

// method below is used to add a user to the db
exports.createNewUser = async (ctx) => {
  try {
    // using array destructuring to get the details provided by the user
    // in the api endpoint
    const { firstName, lastName, email, password } = ctx.request.body;
    const passwordHash = await passwordService.createPasswordHash(password);

    // using the create() method from the db.Users model provided by the
    // ctx instance for adding the details of the user to the db
    const userData = await ctx.db.Users.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordHash,
    });

    if (!userData) {
      ctx.status = 400;
      return (ctx.body = {
        error: "Error while adding data to the db",
      });
    }
    ctx.body = {
      message: "User added successfully",
    };
  } catch (err) {
    ctx.throw(500, err);
  }
};

// method to delete the user based on the id
exports.deleteUserById = async (ctx) => {
  try {
    const userId = ctx.params.id;
    const userData = await ctx.db.Users.findOne({
      where: {
        id: userId,
      },
    });

    if (!userData) {
      ctx.status = 404;
      return (ctx.body = {
        error: `No user found with id ${userId}`,
      });
    }

    const result = await ctx.db.Users.destroy({
      where: {
        id: userId,
      },
    });

    if (result == 0) {
      ctx.status = 404;
      return (ctx.body = {
        error: `No user found with id ${userId}`,
      });
    }
    ctx.body = {
      message: "User deleted successfully",
    };
  } catch (err) {
    ctx.throw(500, err);
  }
};

// method to update the details of the user based on the id
exports.updateDetailsOfUserBasedOnId = async (ctx) => {
  try {
    const userId = ctx.params.id;
    // using array destructuring to get the details provided by the user
    // in the body of the api endpoint
    const { firstName, lastName, email } = ctx.request.body;
    const userData = await ctx.db.Users.findOne({
      where: {
        id: userId,
      },
    });

    if (!userData) {
      ctx.status = 404;
      return (ctx.body = {
        error: `No user found with id ${userId}`,
      });
    }

    const result = await ctx.db.Users.update(
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    if (result.includes(0)) {
      ctx.status = 400;
      return (ctx.body = {
        error: "Unable to update the details of the user",
      });
    }

    ctx.body = {
      message: `Details of user with id ${userId} updated successfully`,
      data: ctx.request.body,
    };
  } catch (err) {
    ctx.throw(500, err);
  }
};
