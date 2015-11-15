var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 5050 });

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
