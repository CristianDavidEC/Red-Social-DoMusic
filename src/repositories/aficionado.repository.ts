import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {Aficionado, AficionadoRelations, Usuario, GrupoXAficionado} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';
import {GrupoXAficionadoRepository} from './grupo-x-aficionado.repository';

export class AficionadoRepository extends DefaultCrudRepository<
  Aficionado,
  typeof Aficionado.prototype.idAficionado,
  AficionadoRelations
> {

  public readonly usuario: HasOneRepositoryFactory<Usuario, typeof Aficionado.prototype.idAficionado>;

  public readonly grupoXAficionado: BelongsToAccessor<GrupoXAficionado, typeof Aficionado.prototype.idAficionado>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('GrupoXAficionadoRepository') protected grupoXAficionadoRepositoryGetter: Getter<GrupoXAficionadoRepository>,
  ) {
    super(Aficionado, dataSource);
    this.grupoXAficionado = this.createBelongsToAccessorFor('grupoXAficionado', grupoXAficionadoRepositoryGetter,);
    this.registerInclusionResolver('grupoXAficionado', this.grupoXAficionado.inclusionResolver);
    this.usuario = this.createHasOneRepositoryFactoryFor('usuario', usuarioRepositoryGetter);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
