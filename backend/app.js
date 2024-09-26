// app.js

 "use strict";

// Load environment variables from the .env file
require("dotenv").config();



// External dependencies
const express = require("express");
const path = require("path");


// Session and database dependencies
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");



// Authentication dependencies
const passport = require("passport");
const flash = require("connect-flash");
const { conn } = require("./config/db");
const MongoStore = require("connect-mongo");


// Express application instance
const app = express();



const allowedOrigins = [
  "*",
  "http://127.0.0.1:3000",
  "http://10.17.1.252:3000",
  "http://10.17.1.114:3000",
  "http://0.0.0.0:3000/",
  "http://localhost:3000",
];



app.use(
  cors({
    origin: (origin, next) => {
      if (!origin || allowedOrigins.includes(origin)) {
        next(null, true);
      } else {
        next(new Error(`${origin} not allowed`));
      }
    },
  })
);


// Set up sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);


// Global variables across routes
app.use(async (req, res, next) => {
  try {
    res.locals.session = req.session;
    res.locals.currentUser = req.user;
    res.locals.url = process.env.FETCH_HOST;
    // Set global variable for EJS templates
    next();
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});


app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Set up view engine and static assets
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("view cache", false);
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));


const options = {
  mongoUrl: conn.client.s.url, // MongoDB connection string
  collectionName: "sessions", // Name of the MongoDB collection for session storage
  ttl: 14 * 24 * 60 * 60, //  = 14 days. Default
  autoRemove: "interval", // Automatically remove expired session data
};


//Set Up sessions with version 5.1.0 from 3.2.0
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create(options),
    resave: false, // Add this option to suppress the warning
    saveUninitialized: false, // Add this option to suppress the warning
  })
);



// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Load passport configuration
require("./config/passport");


// Set up middleware and body parsing
app.use(flash());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const indexRoutes = require("./routes/indexRoutes");


//For the new app and routes 
const appRoutes = require("./routes/appRoutes");
const authRoutes = require("./routes/authRoutes");


app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

//For the new App Structure
app.use("/app", appRoutes);
app.use("/auth", authRoutes);





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




/****
 * "use strict";

// Load environment variables from the .env file
require("dotenv").config();


// External dependencies
const express = require("express");
const path = require("path");

// Internationalization and localization
const { i18n } = require('./i18n');
const i18nextMiddleware = require("i18next-http-middleware");


// Session and database dependencies
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");


// Authentication dependencies
const passport = require("passport");
const flash = require("connect-flash");
const Cart = require("./models/ucart");
const { conn } = require("./config/db");
const MongoStore = require("connect-mongo");


//Middleware for Balance & Language Global
const balanceGlobal = require("./middleware/walletBalance");
const permissionsRoles = require("./middleware/permissionCache");
const applyUserLanguage = require('./middleware/language'); 
const setGravatar = require('./middleware/gravatar'); 




//schedule cron
const CronJob = require("cron").CronJob;
const { checkOutRooms, updateRoomAvailability } = require("./worker/hotelCron");

// Express application instance
const app = express();

const allowedOrigins = [
  "*",
  "http://127.0.0.1:3000",
  "https://rccghospitality.com",
  "https://fonts.googleapis.com",
  "https://fonts.gstatic.com",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, next) => {
      if (!origin || allowedOrigins.includes(origin)) {
        next(null, true);
      } else {
        next(new Error(`${origin} not allowed`));
      }
    },
  })
);

// Use i18next middleware for language detection
app.use(i18nextMiddleware.handle(i18n));



// Set up view engine and static assets
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("view cache", false);
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));




const options = {
  mongoUrl: conn.client.s.url, // MongoDB connection string
  collectionName: "sessions", // Name of the MongoDB collection for session storage
  ttl: 14 * 24 * 60 * 60, //  = 14 days. Default
  autoRemove: "interval", // Automatically remove expired session data
};



//Set Up sessions with version 5.1.0 from 3.2.0
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create(options),
    resave: false, // Add this option to suppress the warning
    saveUninitialized: false, // Add this option to suppress the warning
  })
);




// Set up middleware and body parsing
app.use(logger("dev"));
app.use(flash());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));

// Serve static files
app.use("/documents", express.static(path.join(__dirname, "documents")));
app.use("/roomImages", express.static(path.join(__dirname, "roomImages")));


// Passport initialization
app.use(passport.initialize());
app.use(passport.session());


// Load passport configuration
require("./config/passport");


function formatPrice(priceInCents) {
  const price = priceInCents.toString(); // Convert price to a string
  const len = price.length;
  let formattedPrice = "";

  // Determine the starting index for the first comma
  const firstCommaIndex = len % 3 || 3;

  // Add digits before the first comma
  formattedPrice += price.slice(0, firstCommaIndex);
  // Add commas and remaining digits
  for (let i = firstCommaIndex; i < len; i += 3) {
    formattedPrice += "," + price.slice(i, i + 3);
  }
  // Add ".00" for the Kobo component
  formattedPrice += ".00";
  return formattedPrice;
}



// Global variables across routes
app.use(async (req, res, next) => {
  try {
    res.locals.currentUrl = req.originalUrl;
    res.locals.session = req.session;
    res.locals.currentUser = req.user;
    res.locals.formatPrice = formatPrice;

    let cartItemsCount = {
      hotel: 0,
      car: 0,
      market: 0,
      food: 0,
      attractions: 0,
    };

    if (req.user) {
      res.locals.userId = req.user._id;


      const cart = await Cart.findOne({ user: req.user._id }).lean();
      if (cart && cart.items) {
        cart.items.forEach((item) => {
          cartItemsCount[item.productType] += item.quantity;
        });
      }
    } else if (req.session.cart && req.session.cart.items) {
      req.session.cart.items.forEach((item) => {
        cartItemsCount[item.productType] += item.quantity;
      });
    }

    res.locals.cartItemsCount = cartItemsCount;
    next();
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});



//Use balance Global as variable
app.use(balanceGlobal);
app.use(applyUserLanguage);
app.use(setGravatar);
app.use(permissionsRoles);


// Routes configuration
const indexRouter = require("./routes/web/index");
const usersRouter = require("./routes/web/user");
const pagesRouter = require("./routes/web/pages");
const adminRouter = require("./routes/web/admin");
const roomRouter = require("./routes/web/room");
const searchRouter = require("./routes/web/search");
const bookRouter = require("./routes/web/bookings");
const carRouter = require("./routes/web/cars");
const foodRouter = require("./routes/web/foods");
const marketRouter = require("./routes/web/markets");
const localTourRouter = require("./routes/web/localTours");
const touristCentresRouter = require("./routes/web/touristCentres");
const blogRouter = require("./routes/web/blog");

//Api Routes Configurations
const apiindexRouter = require("./routes/api/index");
const apiusersRouter = require("./routes/api/user");
const apipagesRouter = require("./routes/api/pages");
const apiroomRouter = require("./routes/api/room");
const apisearchRouter = require("./routes/api/search");
const apibookRouter = require("./routes/api/bookings");
const apicarRouter = require("./routes/api/cars");
const apifoodRouter = require("./routes/api/foods");
const apimarketRouter = require("./routes/api/markets");
const apilocalTourRouter = require("./routes/api/localTours");
const apitouristCentresRouter = require("./routes/api/touristCentres");

const { localsName } = require("ejs");
const loadPermissions = require("./middleware/permissionCache");

//Use Routes and API Config
app.use("/", indexRouter);
app.use("/rooms", roomRouter);
app.use("/user", usersRouter);
app.use("/pages", pagesRouter);
app.use("/admin", adminRouter);
app.use("/search", searchRouter);
app.use("/market", marketRouter);
app.use("/bookings", bookRouter);
app.use("/car", carRouter);
app.use("/food", foodRouter);
app.use("/tour", localTourRouter);
app.use("/places", touristCentresRouter);
app.use("/blog", blogRouter);


//For API Communications

app.use("/api/", apiindexRouter);
app.use("/api/rooms", apiroomRouter);
app.use("/api/user", apiusersRouter);
app.use("/api/pages", apipagesRouter);
app.use("/api/search", apisearchRouter);
app.use("/api/bookings", apibookRouter);
app.use("/api/car", apicarRouter);
app.use("/api/food", apifoodRouter);
app.use("/api/Localtour", apilocalTourRouter);
app.use("/api/market", apimarketRouter);
app.use("/api/places", apitouristCentresRouter);



// Error handling middleware for 404 (Page Not Found) errors
app.use((req, res, next) => {
  res.status(404).render("error/404");
});


// Error handling middleware for 403 (Forbidden) errors
app.use((err, req, res, next) => {
  if (err.status === 403) {
    return res.status(403).render("error/403");
  }
  next(err); // Pass to the next error handler if not a 403 error
});

// Error handling middleware for 500 (Internal Server Error) errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error/500");
});


///Server initialization
const port = process.env.PORT;
app.set("port", port);


app.listen(port, '0.0.0.0', () => {
  console.log("Server running at port " + port);
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  const max = process.memoryUsage().heapTotal / 1024 / 1024;
  console.log(`Max heap size: ${max} MB  current Heap usage: ${used} MB`);
});




module.exports = app;


 * 
 * 
 * 
 * 
 * 
 * 
 */