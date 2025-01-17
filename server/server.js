const path = require('path');
const express = require('express');
const userController = require('./userController');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/bundleFolder', express.static(path.join(__dirname, '../bundleFolder')));

// refactor to add a router for the '/api' route and rename '/api' route

app.post('/api', userController.checkSign, userController.createUser, (req, res) => {
  //post request from signup page
  return res.status(200).send(true); 
});

app.get('/api', userController.checkLog, (req, res) => {
  //get request from login page
  return res.status(200).json(res.locals.exists);
});

app.patch('/api', userController.updateScore, (req, res) => {
  //patch request to update user score
  return res.status(200).json('score updated');
});

app.get('/board', userController.leaderBoard, (req, res) => {
  //for diaplying the entire leaderboard
  return res.status(200).json(res.locals.board);
});

app.get('/user', userController.getScore, (req, res) => {
  console.log('inside app.get for /user: ', res.locals.data)
  return res.status(200).json(res.locals.data);
});

app.get('/', (req, res) => {
  //serve webpack production index.html
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

// post to favorite questions table
app.post('/favorites', userController.addToFavorites, (req, res) => {
  return res.status(200).json('question added to favorites');
})

// delete from questions table
app.delete('/favorites', userController.removeFromFavorites, (req, res) => {
  return res.status(200).json('question removed from favorites');
})

// check if question is favorited
app.get('/favorites', userController.checkFavorites, (req, res) => {
  return res.status(200).json(res.locals.isFavorite);
})

app.get('/allfavorites', userController.getUserFavorites, (req, res) => {
  return res.status(200).json(res.locals.data);
})


//new route for progress update
app.patch('/api/updateProgress', userController.updateProgress ,(req, res) => {
  return res.status(200).json(res.locals.data);
} )

//new router for resetting the progress and the score 
app.patch('/api/resetScore', userController.reset, (req, res) => {
  return res.status(200).json(res.locals.data);
})


//catch all route handler
app.use('*', (req, res) => {
  return res.status(404).send('THIS ENDPOINT DOES NOT EXIST')
});

// global error handler:
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred!!!!!!!!!' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, (req, res) => {
  console.log("Yay, express server is running on PORT 3000")
})