const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/socket.controller');



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {}

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        //Sockets
        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));

    }

    routes() { }

    sockets() {

        this.io.on('connection',socketController );

    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Server is running on port', this.port);
        });
    }

}




module.exports = Server;