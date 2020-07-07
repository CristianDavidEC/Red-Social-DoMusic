import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {GrupoXAficionado, GrupoXAficionadoRelations, Aficionado, Grupo} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {AficionadoRepository} from './aficionado.repository';
import {GrupoRepository} from './grupo.repository';

export class GrupoXAficionadoRepository extends DefaultCrudRepository<
  GrupoXAficionado,
  typeof GrupoXAficionado.prototype.idGrupoXAficionado,
  GrupoXAficionadoRelations
> {

  public readonly aficionados: HasManyRepositoryFactory<Aficionado, typeof GrupoXAficionado.prototype.idGrupoXAficionado>;

  public readonly grupos: HasManyRepositoryFactory<Grupo, typeof GrupoXAficionado.prototype.idGrupoXAficionado>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('AficionadoRepository') protected aficionadoRepositoryGetter: Getter<AficionadoRepository>, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>,
  ) {
    super(GrupoXAficionado, dataSource);
    this.grupos = this.createHasManyRepositoryFactoryFor('grupos', grupoRepositoryGetter,);
    this.registerInclusionResolver('grupos', this.grupos.inclusionResolver);
    this.aficionados = this.createHasManyRepositoryFactoryFor('aficionados', aficionadoRepositoryGetter,);
    this.registerInclusionResolver('aficionados', this.aficionados.inclusionResolver);
  }
}
