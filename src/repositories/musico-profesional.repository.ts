import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MusicoProfesional, MusicoProfesionalRelations, Usuario, Banda} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';
import {BandaRepository} from './banda.repository';

export class MusicoProfesionalRepository extends DefaultCrudRepository<
  MusicoProfesional,
  typeof MusicoProfesional.prototype.idMusicoProfesional,
  MusicoProfesionalRelations
> {

  public readonly usuario: HasOneRepositoryFactory<Usuario, typeof MusicoProfesional.prototype.idMusicoProfesional>;

  public readonly banda: BelongsToAccessor<Banda, typeof MusicoProfesional.prototype.idMusicoProfesional>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('BandaRepository') protected bandaRepositoryGetter: Getter<BandaRepository>,
  ) {
    super(MusicoProfesional, dataSource);
    this.banda = this.createBelongsToAccessorFor('banda', bandaRepositoryGetter,);
    this.registerInclusionResolver('banda', this.banda.inclusionResolver);
    this.usuario = this.createHasOneRepositoryFactoryFor('usuario', usuarioRepositoryGetter);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
