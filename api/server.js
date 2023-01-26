//Imports
const express = require('express');
const projectsRouter = require('./projects/projects-router.js')
const actionsRoute = require('./actions/actions-router.js')


//Instance
const server = express();

server.use(express.json())
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRoute)


// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
