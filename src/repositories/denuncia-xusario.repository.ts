import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DenunciaXusario, DenunciaXusarioRelations, Usuario} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';

export class DenunciaXusarioRepository extends DefaultCrudRepository<
  DenunciaXusario,
  typeof DenunciaXusario.prototype.idDenunciaXusuario,
  DenunciaXusarioRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof DenunciaXusario.prototype.idDenunciaXusuario>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(DenunciaXusario, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
