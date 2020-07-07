import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Grupo, GrupoRelations, GrupoXAficionado, GrupoXMusicoP} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {GrupoXAficionadoRepository} from './grupo-x-aficionado.repository';
import {GrupoXMusicoPRepository} from './grupo-x-musico-p.repository';

export class GrupoRepository extends DefaultCrudRepository<
  Grupo,
  typeof Grupo.prototype.idGrupo,
  GrupoRelations
> {

  public readonly grupoXAficionado: BelongsToAccessor<GrupoXAficionado, typeof Grupo.prototype.idGrupo>;

  public readonly grupoXMusicoP: BelongsToAccessor<GrupoXMusicoP, typeof Grupo.prototype.idGrupo>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('GrupoXAficionadoRepository') protected grupoXAficionadoRepositoryGetter: Getter<GrupoXAficionadoRepository>, @repository.getter('GrupoXMusicoPRepository') protected grupoXMusicoPRepositoryGetter: Getter<GrupoXMusicoPRepository>,
  ) {
    super(Grupo, dataSource);
    this.grupoXMusicoP = this.createBelongsToAccessorFor('grupoXMusicoP', grupoXMusicoPRepositoryGetter,);
    this.registerInclusionResolver('grupoXMusicoP', this.grupoXMusicoP.inclusionResolver);
    this.grupoXAficionado = this.createBelongsToAccessorFor('grupoXAficionado', grupoXAficionadoRepositoryGetter,);
    this.registerInclusionResolver('grupoXAficionado', this.grupoXAficionado.inclusionResolver);
  }
}
