import dotenv from 'dotenv';
import express from 'express';
import passport from './authenticate/index.js';
import usersRouter from './api/user/index.js';
import recipeRouter from './api/recipe/index.js';
import favouriteRouter from './api/favourite/index.js';
import commentRouter from './api/comment/index.js';
import recommendRouter from './api/recommend/index.js';
import './db/index.js';
import './seed/index.js';

dotenv.config();

const errHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).json({ success: false, msg: err.stack });
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};

const app = express();
const port = process.env.PORT;

app.use(express.json());  // This line should be before useRoutes -- important
app.use(passport.initialize());

app.use('/api/user', usersRouter);
app.use('/api/recipe', recipeRouter);
app.use('/api/favourites', favouriteRouter);
app.use('/api/comments', commentRouter);
app.use('/api/recommend', recommendRouter);
// app.use('/api/movies', passport.authenticate('jwt', { session: false }), moviesRouter);
// app.use('/api/tv', passport.authenticate('jwt', { session: false }), tvRouter);
// app.use('/api/people', passport.authenticate('jwt', { session: false }), peopleRouter);
// app.use('/api/favourites', passport.authenticate('jwt', { session: false }), favouriteRouter);
// app.use('/api/recommend', passport.authenticate('jwt', { session: false }), recommendRouter);
app.use(errHandler);
app.listen(port, () => {
  console.info(`Server running at ${port}`);
});