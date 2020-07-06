import {DefaultCrudRepository} from '@loopback/repository';
import {Aficionado, AficionadoRelations} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AficionadoRepository extends DefaultCrudRepository<
  Aficionado,
  typeof Aficionado.prototype.idAficionado,
  AficionadoRelations
> {
  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource,
  ) {
    super(Aficionado, dataSource);
  }
}
