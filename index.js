const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const express = require('express')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const server = express()

const serverlessExpress = require('@vendia/serverless-express');

module.exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  return app.prepare().then(() => {
    server.get('/health', (req, res) => {
      res.status(200).send('OK')
    })

    server.get('/a', (req, res) => {
      return app.render(req, res, '/a', req.query)
    })

    server.get('/b', (req, res) => {
      return app.render(req, res, '/b', req.query)
    })

    server.all('*', (req, res) => {
      return handle(req, res)
    })

    return serverlessExpress({
      server,
      resolutionMode: 'CALLBACK',
      log: {
        info(message, additional) {
          console.info(message, additional);
        },
        debug(message, additional) {
        },
        error(message, additional) {
          console.error(message, additional);
        },
      },
    }).handler(event, context, callback)
  });
};
