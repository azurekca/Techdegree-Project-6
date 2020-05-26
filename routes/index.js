const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');

router.get('/', (req, res) => {
  res.render('index', { projects });
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/project/:id', (req, res, next) => {
  const id = req.params.id;
  const project = projects.find(project => project.id === +id);
  if (project) {
    res.render('project', { project })
  } else {
    next();
  }
})



module.exports = router;