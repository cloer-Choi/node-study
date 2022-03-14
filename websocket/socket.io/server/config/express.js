const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
// const cors = require('cors');
const passportConfig = require('./passport');
const passport = passportConfig();

// Routers
const homeRouter = require('../src/routers/home/homeRouter');
const authRouter = require('../src/routers/auth/authRouter');
const chatRouter = require('../src/routers/chat/chatRouter');

// Error Exception
const errorRouter = require('../src/routers/error/errorRouter');

module.exports = function () {
  const app = express();

  app.set('port', process.env.PORT || 8004);

  app.use(morgan('dev'));
  // app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      store: new FileStore(),
      cookie: {
        httpOnly: true,
        secure: false,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // Routers
  app.use('/', homeRouter);
  app.use('/auth', authRouter);
  app.use('/chat', chatRouter);

  // Error Exception
  app.use(errorRouter);

  return app;
};