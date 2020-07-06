import {DefaultCrudRepository} from '@loopback/repository';
import {Usuario, UsuarioRelations} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.idUsuario,
  UsuarioRelations
> {
  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource,
  ) {
    super(Usuario, dataSource);
  }
}
