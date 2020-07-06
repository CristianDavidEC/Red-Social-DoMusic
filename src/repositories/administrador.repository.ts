import {DefaultCrudRepository} from '@loopback/repository';
import {Administrador, AdministradorRelations} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.idAdministrador,
  AdministradorRelations
> {
  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource,
  ) {
    super(Administrador, dataSource);
  }
}
