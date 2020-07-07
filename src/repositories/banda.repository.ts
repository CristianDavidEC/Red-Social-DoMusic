import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {Banda, BandaRelations, Usuario, MusicoProfesional} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';
import {MusicoProfesionalRepository} from './musico-profesional.repository';

export class BandaRepository extends DefaultCrudRepository<
  Banda,
  typeof Banda.prototype.idBanda,
  BandaRelations
> {

  public readonly usuario: HasOneRepositoryFactory<Usuario, typeof Banda.prototype.idBanda>;

  public readonly musicoProfesionals: HasManyRepositoryFactory<MusicoProfesional, typeof Banda.prototype.idBanda>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('MusicoProfesionalRepository') protected musicoProfesionalRepositoryGetter: Getter<MusicoProfesionalRepository>,
  ) {
    super(Banda, dataSource);
    this.musicoProfesionals = this.createHasManyRepositoryFactoryFor('musicoProfesionals', musicoProfesionalRepositoryGetter,);
    this.registerInclusionResolver('musicoProfesionals', this.musicoProfesionals.inclusionResolver);
    this.usuario = this.createHasOneRepositoryFactoryFor('usuario', usuarioRepositoryGetter);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
