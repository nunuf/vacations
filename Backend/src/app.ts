import cors from 'cors';
import express from 'express';
import expressFileUpload from 'express-fileupload';
import appConfig from './2-utils/app-config';
import catchAll from './3-middleware/catch-all';
import expressRateLimit from 'express-rate-limit';
import logRequest from './3-middleware/log-request';
import routeNotFound from './3-middleware/route-not-found';
import sanitize from './3-middleware/sanitize';
import authController from './6-controllers/auth-controller';
import followerController from './6-controllers/follower-controller';
import vacationController from './6-controllers/vacation-controller';

// Create express server
const server = express();

// Defend against DoS attack
server.use('/api', expressRateLimit({
  max: 20, // Maximum requests per same client
  windowMs: 1000, // Time window to allow the max requests
}));

// Tell express to take the JSON resides in request's body into request.body object
server.use(express.json());

// Sanitize request.body - remove HTML and script tags
server.use(sanitize);

// Integrate express-fileupload middleware to handle uploaded files
server.use(expressFileUpload());

// Connecting frontend to backend
server.use(cors({ origin: appConfig.frontEndUrl }));

// Binding middleware
server.use(logRequest);

// Tell the server to listen to any router written in controllers
server.use('/api', vacationController);
server.use('/api', authController);
server.use('/api', followerController);

// Route not found middleware
server.use('*', routeNotFound);

// Catch-All middleware
server.use(catchAll);

// Run the server
server.listen(appConfig.port, () => console.log(`Listening on port ${appConfig.port}`));
