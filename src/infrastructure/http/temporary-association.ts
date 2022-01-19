import * as core from 'express-serve-static-core';
import Routes from './routes';
import HTTPCode from './types';
import Controllers from '../../boundaries/controllers';

export default class TemporaryAssociationRoutes extends Routes {
  static mount(app: core.Express, controllers: Controllers): void {
    app.get('/associations/unpublished/:id', async (req, res) => {
      const association = await controllers.temporaryAssociation.show(Number(req.params.id));

      if (association) {
        TemporaryAssociationRoutes.buildResponse(
          res,
          HTTPCode.Ok,
          'Unpublished association is found',
          association,
        );
      } else {
        TemporaryAssociationRoutes.buildResponse(res, HTTPCode.NotFound, 'Association not found');
      }
    });
  }
}
