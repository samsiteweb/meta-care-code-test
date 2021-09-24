import bodyParser from 'body-parser';
import cors from 'cors';
import config from '../../config';
import routes from '../routes';
import errorHandlerMiddleware from '../../middlewares/errorHanderMiddleware/errorHandler';
// import LoggerInstance from '../logger'

export default async(app) => {
    app.use(cors());
    app.enable('trust proxy');
    //app.use(morgan('combine'));
  

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    // error handler middleware
    app.use(errorHandlerMiddleware);

    app.get('/', (req, res) => {
        res.status(202).send({
            memory_useage: process.memoryUsage(),
            up_time: process.uptime(),
            pid: process.pid,
            uid: process.getuid,
            allowedNodeENV: process.allowedNodeEnvironmentFlags
        });
    });
    app.use((req, res, next) => {
        // LoggerInstance.info(`${req.originalUrl} - statusCode:${res.statusCode} - severhost: ${req.headers.host} - method: ${req.method} - ${req.ip}`);
        next();
    })

    app.use(config.api.prefix, routes());
    
    app.use((req, res, next) => {
        const err = new Error("Not Found");
        err.status = 404;
        next(err);
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500).json({
            errors: {
                message: err.message,
            },
        });
      
    });

    return app;
};