import cors from 'cors';
import express from 'express';
import expressFileUpload from 'express-fileupload';
import logRequest from './3-middleware/log-request';
import catchAll from './3-middleware/catch-all';
import routeNotFound from './3-middleware/route-not-found';
import vacationController from './6-controllers/vacation-controller';
import authController from './6-controllers/auth-controller';

// Create express server
const server = express();

// Tell express to take the JSON resides in request's body into request.body object
server.use(express.json());

// Integrate express-fileupload middleware to handle uploaded files
server.use(expressFileUpload());

// Connecting frontend to backend
server.use(cors());

// Binding middleware
server.use(logRequest);

// Tell the server to listen to any router written in controllers
server.use('/api', vacationController);
server.use('/api', authController);

// Route not found middleware
server.use('*', routeNotFound);

// Catch-All middleware
server.use(catchAll);

// Run the server
server.listen(3001, ()=>console.log('Listening on http://localhost:3001'));
