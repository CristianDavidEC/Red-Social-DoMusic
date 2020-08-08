import {DefaultCrudRepository} from '@loopback/repository';
import {Publicidad, PublicidadRelations} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PublicidadRepository extends DefaultCrudRepository<
  Publicidad,
  typeof Publicidad.prototype.idPublicidad,
  PublicidadRelations
> {
  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource,
  ) {
    super(Publicidad, dataSource);
  }
}
