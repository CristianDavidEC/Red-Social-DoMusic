import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Banda, BandaRelations, Usuario} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';

export class BandaRepository extends DefaultCrudRepository<
  Banda,
  typeof Banda.prototype.idBanda,
  BandaRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Banda.prototype.idBanda>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Banda, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
