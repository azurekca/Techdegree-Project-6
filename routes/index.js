const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');

// home page
router.get('/', (req, res) => {
  res.render('index', { projects });
});

// about page
router.get('/about', (req, res) => {
  res.render('about');
});

// project details pages
router.get('/project/:id', (req, res, next) => {
  const id = +req.params.id;
  const project = projects.find(project => project.id === id);
  if (project) {
    // get the id for the prev and next projects
    let prev = id - 1;
    if (prev < 0) prev = projects.length - 1;
    let next = id + 1;
    if (next >= projects.length) next = 0;

    res.render('project', { project, prev, next })
  } else {
    next();
  }
})



module.exports = router;