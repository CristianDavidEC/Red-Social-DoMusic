import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MusicoProfesional, MusicoProfesionalRelations, Usuario} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';

export class MusicoProfesionalRepository extends DefaultCrudRepository<
  MusicoProfesional,
  typeof MusicoProfesional.prototype.idMusicoProfesional,
  MusicoProfesionalRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof MusicoProfesional.prototype.idMusicoProfesional>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(MusicoProfesional, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
