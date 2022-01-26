import { Express } from 'express';
import Routes from './routes';
import HTTPCode from './types';
import ControllersI from '../../boundaries/controllers';

export default class AssociationRoutes extends Routes {
  static mount(app: Express, controllers: ControllersI): void {
    app.get('/', async (req, res) => {
      await controllers.association.show(1);

      Routes.buildResponse(res, HTTPCode.Created, 'Association is created');
    });
  }
}
