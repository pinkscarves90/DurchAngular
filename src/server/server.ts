import * as express from "express";
import * as path from "path";
import * as http from "http";
import * as bodyParser from "body-parser";
import { BackendApi } from './backendapi';
let cors = require("cors");
class Server {
    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        // create expressjs application 
        this.app = express();

        // configure application 
        this.config();

        // configure routes 
        this.routes();
    }
    private routes() {
        // get router 
        let router: express.Router;
        router = express.Router();

        // create routes 
        const api: BackendApi = new BackendApi();

        // test API 
        //router.get('/api/test', api.test.bind(api.test));
        router.post('/api/reserve', api.reserve.bind(api.reserve));
        router.post('/api/rateQuote', api.rateQuote.bind(api.rateQuote));
        // use router middleware 
        this.app.use(router);

        // Catch all other routes and return the index file 
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'public/index.html'));
        });
    }
    private config() {
        // Parsers for POST data 
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Point static path to public folder 
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(cors(), function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
            res.header(
              "Access-Control-Allow-Headers",
              "Origin, X-Requested-With, Content-Type, Accept"
            );
            next();
          });
        /** 
         * Get port from environment and store in Express. 
         */
        const port = process.env.PORT || '3000';
        this.app.set('port', port);

        /** 
         * Create HTTP server. 
         */
        const server = http.createServer(this.app);

        /** 
         * Listen on provided port, on all network interfaces. 
         */
        server.listen(port, () => console.log(`Node server started at localhost:${port}`));
    }
}
Server.bootstrap()
