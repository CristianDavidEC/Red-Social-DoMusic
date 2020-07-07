import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Administrador, AdministradorRelations, Usuario} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.idAdministrador,
  AdministradorRelations
> {

  public readonly usuario: HasOneRepositoryFactory<Usuario, typeof Administrador.prototype.idAdministrador>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Administrador, dataSource);
    this.usuario = this.createHasOneRepositoryFactoryFor('usuario', usuarioRepositoryGetter);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
