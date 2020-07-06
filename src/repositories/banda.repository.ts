import {DefaultCrudRepository} from '@loopback/repository';
import {Banda, BandaRelations} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BandaRepository extends DefaultCrudRepository<
  Banda,
  typeof Banda.prototype.idBanda,
  BandaRelations
> {
  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource,
  ) {
    super(Banda, dataSource);
  }
}
