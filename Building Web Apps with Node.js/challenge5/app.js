'use strict'

var express = require('express')
var http = require('http')
var path = require('path')

var app = express()

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.static(path.join(__dirname, 'public')))
})

app.configure('development', function () {
    app.use(express.errorHandler())
})

// Set up express
var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'))
})

// Set up socket.io
var io = require('socket.io').listen(server)

// Handle socket traffic
io.sockets.on('connection', function (socket) {
    // Relay chat data to all clients
    socket.on('nickname', function (nickname) {
      socket.set('nickname', nickname)
    })

    socket.on('chat', function (data) {
        socket.get('nickname', function (err, nickname) {
          var nickname = err ? 'Anonymous' : nickname

          var payload = {
            message : data.message,
            nickname : nickname
          }
          socket.emit('chat', payload)
          socket.broadcast.emit('chat', payload)
        })
    })
})
