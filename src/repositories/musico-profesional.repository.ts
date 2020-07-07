import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MusicoProfesional, MusicoProfesionalRelations, Usuario, Banda, Publicacion, GrupoXMusicoP} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';
import {BandaRepository} from './banda.repository';
import {PublicacionRepository} from './publicacion.repository';
import {GrupoXMusicoPRepository} from './grupo-x-musico-p.repository';

export class MusicoProfesionalRepository extends DefaultCrudRepository<
  MusicoProfesional,
  typeof MusicoProfesional.prototype.idMusicoProfesional,
  MusicoProfesionalRelations
> {

  public readonly usuario: HasOneRepositoryFactory<Usuario, typeof MusicoProfesional.prototype.idMusicoProfesional>;

  public readonly banda: BelongsToAccessor<Banda, typeof MusicoProfesional.prototype.idMusicoProfesional>;

  public readonly publicacions: HasManyRepositoryFactory<Publicacion, typeof MusicoProfesional.prototype.idMusicoProfesional>;

  public readonly grupoXMusicoP: BelongsToAccessor<GrupoXMusicoP, typeof MusicoProfesional.prototype.idMusicoProfesional>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('BandaRepository') protected bandaRepositoryGetter: Getter<BandaRepository>, @repository.getter('PublicacionRepository') protected publicacionRepositoryGetter: Getter<PublicacionRepository>, @repository.getter('GrupoXMusicoPRepository') protected grupoXMusicoPRepositoryGetter: Getter<GrupoXMusicoPRepository>,
  ) {
    super(MusicoProfesional, dataSource);
    this.grupoXMusicoP = this.createBelongsToAccessorFor('grupoXMusicoP', grupoXMusicoPRepositoryGetter,);
    this.registerInclusionResolver('grupoXMusicoP', this.grupoXMusicoP.inclusionResolver);
    this.publicacions = this.createHasManyRepositoryFactoryFor('publicacions', publicacionRepositoryGetter,);
    this.registerInclusionResolver('publicacions', this.publicacions.inclusionResolver);
    this.banda = this.createBelongsToAccessorFor('banda', bandaRepositoryGetter,);
    this.registerInclusionResolver('banda', this.banda.inclusionResolver);
    this.usuario = this.createHasOneRepositoryFactoryFor('usuario', usuarioRepositoryGetter);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
