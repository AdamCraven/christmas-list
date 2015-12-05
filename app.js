/**
 * A simple example of how to use Waterline v0.10 with Express
 */

var express = require('express'),
    _ = require('lodash'),
    app = express(),
    Waterline = require('waterline'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');
var waterlineFixtures = require('waterline-fixtures');

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
  },
 /* fixtures: [
    {
        model: 'projects',
        items: [
            { name: 'Guinness' },
            { name: 'Sully' },
            { name: 'Ren' }
        ]
    }
  ],*/
};




var Project = require('./server/models/project');

// Load the Models into the ORM
orm.loadCollection(Project);



// EXPRESS SETUP


var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation


// Setup Express Application
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(busboy());
app.use(methodOverride());

// Build Express Routes (CRUD routes for /Projects)


/**
 * Web server routes
 */
app.get('/', function(req,res) {
  res.sendFile('app/index.html',{ root: __dirname });
});

app.get(/node_modules\/(.+)$/, function(req, res) {
  console.log(req.params[0]);
  res.sendFile('/node_modules/' + req.params[0], { root: __dirname });
});
app.get(/^(.+[js|css|html])$/, function(req, res) {
  res.sendFile('app/' + req.params[0], {root: __dirname});
});

app.get(/cdn\/(.+)$/, function(req,res) {
  res.sendFile('uploads/img/' + req.params[0], {root: __dirname});
});

/**
 * Application server routes
 */
app.get('/projects', function(req, res) {
  app.models.project.find().exec(function(err, models) {
    if(err) return res.json({ err: err }, 500);
    res.json(models);
  });
});

app.post('/upload', createOrUpdate.bind(null, true));



function createOrUpdate(isNew, req, res, next) {
  var modelObj = {};
  var fstream;
  req.pipe(req.busboy);

  //read https://www.npmjs.com/package/busboy
  req.busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    console.log('[' + fieldname + ']:' + val);
    if(fieldname === 'purchased') {
      if (val === 'on') {
        val = true;
      }
      else {
        val = false;
      }
    }
    modelObj[fieldname] = val;
  });

  req.busboy.on('file', function(fieldname, file, filename) {
    if (!filename) {
      return true;
    }
    console.log("Uploading: " + filename);

    var sanitizedFilename = filename.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    modelObj.image = sanitizedFilename;
    file.pipe(fs.createOutputStream(__dirname + '/uploads/img/' + sanitizedFilename));
  });

  req.busboy.on('finish', function() {
    if (isNew) {
      app.models.project.create(modelObj, function(err, model) {
        console.log('REQ.body', modelObj);
        console.log('MODEL', model);
        if (err) {
          return res.json({
            err: err
          }, 500);
        }
        res.json({
          success: true
        }); //where to go next
      });
    } else {
      app.models.project.update(modelObj.id, modelObj, function(err, model) {
        console.log('REQ.body', modelObj);
        console.log('MODEL', model);
        if (err) {
          return res.json({
            err: err
          }, 500);
        }
        res.json({
          success: true
        }); //where to go next
      });
    }
  });

}



app.post('/upload/:id', createOrUpdate.bind(null, false));
app.post('/purchased/:id', function(req, res) {
  if(!req.body.id) {
    res.json({success:false});
  }

  var isChecked = (req.body.purchased === 'on') ? true : false;
  app.models.project.update(req.body.id, {purchased: isChecked}, function(err, model) {
    if(err) return res.json({ err: err }, 500);
    res.json(model);
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

    // Load fixtures
  waterlineFixtures.init({
    collections: models.collections,

  }, function doThisAfterFixturesAreLoaded(err) {
      // Start Server
      app.listen(5050);
      console.log("To see saved Projects, visit http://localhost:3000/Projects");
  });

});
