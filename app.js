const Koa = require("koa");
const koaParser = require("koa-parser");

const db = require("./models");
const userRoutes = require("./routes/user_routes");
const todosRoutes = require("./routes/todos_routes");

const app = new Koa();

// middlware for getting the body from the request made at the endpoints
app.use(koaParser());

app.use(userRoutes.routes());
app.use(todosRoutes.routes());

// code for syncing the models to the db
db.sequelize
  .sync()
  .then(() => console.log("All Models Synced Successfully"))
  .catch((err) => console.log(`error while synching the models: ${err}`));

// adding db to app context
app.context.db = db;

// middleware for unhandled routes
app.use((ctx, next) => {
  (ctx.status = 404),
    (ctx.body = {
      error: "Route Not Found",
    });
});

app.listen(4000, () => {
  console.log("App is up and running at port 4000");
});
