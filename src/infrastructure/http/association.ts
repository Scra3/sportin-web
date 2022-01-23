import { Express } from 'express';
import Routes from './routes';
import HTTPCode from './types';
import ControllersI from '../../boundaries/controllers';

export default class AssociationRoutes extends Routes {
  static mount(app: Express, controllers: ControllersI): void {
    app.get('/', async (req, res) => {
      await controllers.association.create({
        association: {
          name: 'a name 2',
          address: 'an address',
          typeOfPractice: 'basket',
          description: 'a descriptin',
          contactDetails: 'je suis un contact',
          logo: 'a logo',
        },
      });

      Routes.buildResponse(res, HTTPCode.Created, 'Association is created');
    });
  }
}
