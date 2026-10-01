const { PeerServer } = require('peer');
PeerServer({ port: 9000, path: '/', host: '127.0.0.1', proxied: false }, (s) => console.log('peer server on 9000'));
