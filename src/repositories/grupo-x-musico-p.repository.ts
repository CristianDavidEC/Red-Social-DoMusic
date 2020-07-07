import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {GrupoXMusicoP, GrupoXMusicoPRelations, MusicoProfesional, Grupo} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MusicoProfesionalRepository} from './musico-profesional.repository';
import {GrupoRepository} from './grupo.repository';

export class GrupoXMusicoPRepository extends DefaultCrudRepository<
  GrupoXMusicoP,
  typeof GrupoXMusicoP.prototype.idGrupoXMusicoP,
  GrupoXMusicoPRelations
> {

  public readonly musicoProfesionals: HasManyRepositoryFactory<MusicoProfesional, typeof GrupoXMusicoP.prototype.idGrupoXMusicoP>;

  public readonly grupos: HasManyRepositoryFactory<Grupo, typeof GrupoXMusicoP.prototype.idGrupoXMusicoP>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('MusicoProfesionalRepository') protected musicoProfesionalRepositoryGetter: Getter<MusicoProfesionalRepository>, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>,
  ) {
    super(GrupoXMusicoP, dataSource);
    this.grupos = this.createHasManyRepositoryFactoryFor('grupos', grupoRepositoryGetter,);
    this.registerInclusionResolver('grupos', this.grupos.inclusionResolver);
    this.musicoProfesionals = this.createHasManyRepositoryFactoryFor('musicoProfesionals', musicoProfesionalRepositoryGetter,);
    this.registerInclusionResolver('musicoProfesionals', this.musicoProfesionals.inclusionResolver);
  }
}
