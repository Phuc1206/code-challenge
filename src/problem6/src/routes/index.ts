import { Application } from 'express';
import apiRouter from './apiRouter';
function route(app: Application) {
  app.use('/api');
}
export default route;
