import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DenunciaXPubli, DenunciaXPubliRelations, Usuario} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';

export class DenunciaXPubliRepository extends DefaultCrudRepository<
  DenunciaXPubli,
  typeof DenunciaXPubli.prototype.idDenunciaXPubli,
  DenunciaXPubliRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof DenunciaXPubli.prototype.idDenunciaXPubli>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(DenunciaXPubli, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
