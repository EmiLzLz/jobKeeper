import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import "./config.js"
import routes from "./routes/index.routes.js";
import links from "./routes/links.routes.js"
import {dirname, join} from "path";
import session from "express-session";
import { fileURLToPath } from "url";
import flash from 'connect-flash';
import helpers from "./helpers/handlebars.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))

//*settings
app.set("views", join(__dirname, "views")); //*la carpeta views esta dentro de src


app.engine(
  ".hbs",
  engine({
    defaultLayout: "main",
    layoutsDir: join(app.get("views"), "layouts"),
    partialsDir: join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: helpers,
  })
);

app.set("view engine", ".hbs");

//*middlewares
/* `app.use(session({...}))` is setting up a middleware function for the Express application that
enables session management. The `session` function takes an object with configuration options as its
argument. */
app.use(session({
  secret: "mysecret",
  resave: false,
  saveUninitialized: false,
}))
app.use(flash());
app.use(morgan("dev"));
/* `app.use(express.urlencoded({extended: false}));` is setting up middleware to parse incoming
requests with urlencoded payloads. This middleware is used to handle data submitted through HTML
forms. The `extended` option allows to choose between parsing the URL-encoded data with the
`querystring` library (when `false`) or the `qs` library (when `true`). */
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//*global variables
/* This middleware function is setting a global variable `success` in the `app.locals` object, which
can be accessed from any view rendered by the application. The value of this variable is obtained
from the `req.flash("success")` method, which retrieves any success messages stored in the session.
The `next()` function is called to pass control to the next middleware function in the stack. */
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
    next();
});

//*routes
app.use(routes);
app.use("/links", links);

//*public
app.use(express.static(join(__dirname, "public")));
app.use(express.static(join(__dirname, "helpers")));

export default app;