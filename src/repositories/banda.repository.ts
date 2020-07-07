import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {Banda, BandaRelations, Usuario, MusicoProfesional, Publicacion} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';
import {MusicoProfesionalRepository} from './musico-profesional.repository';
import {PublicacionRepository} from './publicacion.repository';

export class BandaRepository extends DefaultCrudRepository<
  Banda,
  typeof Banda.prototype.idBanda,
  BandaRelations
> {

  public readonly usuario: HasOneRepositoryFactory<Usuario, typeof Banda.prototype.idBanda>;

  public readonly musicoProfesionals: HasManyRepositoryFactory<MusicoProfesional, typeof Banda.prototype.idBanda>;

  public readonly publicacion: HasOneRepositoryFactory<Publicacion, typeof Banda.prototype.idBanda>;

  public readonly publicacions: HasManyRepositoryFactory<Publicacion, typeof Banda.prototype.idBanda>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('MusicoProfesionalRepository') protected musicoProfesionalRepositoryGetter: Getter<MusicoProfesionalRepository>, @repository.getter('PublicacionRepository') protected publicacionRepositoryGetter: Getter<PublicacionRepository>,
  ) {
    super(Banda, dataSource);
    this.publicacions = this.createHasManyRepositoryFactoryFor('publicacions', publicacionRepositoryGetter,);
    this.registerInclusionResolver('publicacions', this.publicacions.inclusionResolver);
    this.publicacion = this.createHasOneRepositoryFactoryFor('publicacion', publicacionRepositoryGetter);
    this.registerInclusionResolver('publicacion', this.publicacion.inclusionResolver);
    this.musicoProfesionals = this.createHasManyRepositoryFactoryFor('musicoProfesionals', musicoProfesionalRepositoryGetter,);
    this.registerInclusionResolver('musicoProfesionals', this.musicoProfesionals.inclusionResolver);
    this.usuario = this.createHasOneRepositoryFactoryFor('usuario', usuarioRepositoryGetter);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
