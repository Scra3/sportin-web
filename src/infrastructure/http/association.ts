import * as core from 'express-serve-static-core';
import Routes from './routes';
import HTTPCode from './types';
import Controllers from '../../boundaries/controllers';

export default class AssociationRoutes extends Routes {
  static mount(app: core.Express, controllers: Controllers): void {
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

      AssociationRoutes.buildResponse(res, HTTPCode.Created, 'Association is created');
    });
  }
}
