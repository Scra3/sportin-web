import { Express } from 'express';
// import { PermissionMiddlewareCreator } from 'forest-express-sequelize';
import {
  PermissionMiddlewareCreator,
  RecordsGetter,
  SmartActionRequest,
} from 'forest-express-sequelize';
import Routes from './routes';
import HTTPCode from './types';
import ControllersI from '../../boundaries/controllers';
import RepositoriesI from '../../boundaries/repositories';
import Repository from '../db/repository';

export default class TemporaryAssociationRoutes extends Routes {
  static mount(app: Express, controllers: ControllersI, repositories: RepositoriesI): void {
    const permission = new PermissionMiddlewareCreator('TemporaryAssociation');

    app.get('/associations/unpublished/:id', async (req, res) => {
      const association = await controllers.temporaryAssociation.show(Number(req.params.id));

      if (association) {
        Routes.buildResponse(res, HTTPCode.Ok, 'Unpublished association is found', association);
      } else {
        Routes.buildResponse(res, HTTPCode.NotFound, 'Association not found');
      }
    });

    app.post('/forest/actions/publish', permission.smartAction(), async (req, res) => {
      const recordsGetter = new RecordsGetter(
        (repositories.temporaryAssociationRepository as unknown as Repository).model,
        (req as SmartActionRequest).user,
        req.query,
      );

      const ids: Array<string> = await recordsGetter.getIdsFromRequest(req as SmartActionRequest);

      await Promise.all(
        ids.map((id: string) => controllers.temporaryAssociation.publish(Number(id))),
      );

      Routes.buildResponse(res, HTTPCode.Ok, 'Association(s) updated!');
    });
  }
}
