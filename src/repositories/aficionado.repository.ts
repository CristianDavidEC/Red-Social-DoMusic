import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Aficionado, AficionadoRelations, Usuario} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';

export class AficionadoRepository extends DefaultCrudRepository<
  Aficionado,
  typeof Aficionado.prototype.idAficionado,
  AficionadoRelations
> {

  public readonly usuario: HasOneRepositoryFactory<Usuario, typeof Aficionado.prototype.idAficionado>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Aficionado, dataSource);
    this.usuario = this.createHasOneRepositoryFactoryFor('usuario', usuarioRepositoryGetter);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
