const express = require('express');
const path = require('path'); // not sure i'm going to use this
const PORT = process.env.PORT || 3000;

const app = express();

// APP CONFIG
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname,'public')));

const routes = require('./routes/index');
app.use(routes);

// route not found, create custom 404 error
app.use((req, res, next) => {
  // Log statement to indicate that this function is running 
  console.log('Handling 404 error');

  const err = new Error('Error');
  err.status = 404;
  err.message = "Looks like that page doesn't exist.";

  next(err);
});

// Global custom error handler
app.use((err, req, res, next) => {
  // Log statement to indicate that this function is running
  console.log('Handling a global error');
  console.log(err);

  res.locals.error = err;
  res.locals.message = err.message;

  res.status(err.status || 500);
  res.render('error')
});

app.listen(PORT, console.log(`Server running on ${PORT}`));