/**
 * A simple example of how to use Waterline v0.10 with Express
 */

var express = require('express'),
    _ = require('lodash'),
    app = express(),
    Waterline = require('waterline'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var orm = new Waterline();


// WATERLINE CONFIG


// Require any waterline compatible adapters here
var diskAdapter = require('sails-disk');

// Build A Config Object
var config = {
  // Setup Adapters
  // Creates named adapters that have been required
  adapters: {
    'default': diskAdapter,
    disk: diskAdapter,
  },
  // Build Connections Config
  // Setup connections using the named adapter configs
  connections: {
    myLocalDisk: {
      adapter: 'disk'
    },

  },
  defaults: {
    migrate: 'alter'
  }
};




var Project = require('./server/models/project');

// Load the Models into the ORM
orm.loadCollection(Project);



// EXPRESS SETUP


// Setup Express Application
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Build Express Routes (CRUD routes for /Projects)

app.get('/projects', function(req, res) {
  app.models.project.find().exec(function(err, models) {
    if(err) return res.json({ err: err }, 500);
    res.json(models);
  });
});

app.post('/projects', function(req, res) {
  app.models.project.create(req.body, function(err, model) {
    if(err) return res.json({ err: err }, 500);
    res.json(model);
  });
});

app.get('/projects/:id', function(req, res) {
  app.models.project.findOne({ id: req.params.id }, function(err, model) {
    if(err) return res.json({ err: err }, 500);
    res.json(model);
  });
});

app.delete('/projects/:id', function(req, res) {
  app.models.project.destroy({ id: req.params.id }, function(err) {
    if(err) return res.json({ err: err }, 500);
    res.json({ status: 'ok' });
  });
});

app.put('/projects/:id', function(req, res) {
  // Don't pass ID to update
  delete req.body.id;

  app.models.project.update({ id: req.params.id }, req.body, function(err, model) {
    if(err) return res.json({ err: err }, 500);
    res.json(model);
  });
});



// START WATERLINE

// Start Waterline passing adapters in
orm.initialize(config, function(err, models) {
  if(err) throw err;

  app.models = models.collections;
  app.connections = models.connections;

  // Start Server
  app.listen(5050);

  console.log("To see saved Projects, visit http://localhost:3000/Projects");
});
