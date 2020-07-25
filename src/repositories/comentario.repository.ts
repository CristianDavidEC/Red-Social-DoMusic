import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongadbDataSource} from '../datasources';
import {Comentario, ComentarioRelations, Publicacion, Usuario} from '../models';
import {PublicacionRepository} from './publicacion.repository';
import {UsuarioRepository} from './usuario.repository';

export class ComentarioRepository extends DefaultCrudRepository<
  Comentario,
  typeof Comentario.prototype.idComentario,
  ComentarioRelations
  > {

  public readonly comentarios: HasManyRepositoryFactory<Comentario, typeof Comentario.prototype.idComentario>;

  public readonly cComentario: BelongsToAccessor<Comentario, typeof Comentario.prototype.idComentario>;

  public readonly publicacion: BelongsToAccessor<Publicacion, typeof Comentario.prototype.idComentario>;

  public readonly usuario: HasOneRepositoryFactory<Usuario, typeof Comentario.prototype.idComentario>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('ComentarioRepository') protected comentarioRepositoryGetter: Getter<ComentarioRepository>, @repository.getter('PublicacionRepository') protected publicacionRepositoryGetter: Getter<PublicacionRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Comentario, dataSource);
    this.usuario = this.createHasOneRepositoryFactoryFor('usuario', usuarioRepositoryGetter);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.publicacion = this.createBelongsToAccessorFor('publicacion', publicacionRepositoryGetter,);
    this.registerInclusionResolver('publicacion', this.publicacion.inclusionResolver);
    this.cComentario = this.createBelongsToAccessorFor('cComentario', comentarioRepositoryGetter,);
    this.registerInclusionResolver('cComentario', this.cComentario.inclusionResolver);
    this.comentarios = this.createHasManyRepositoryFactoryFor('comentarios', comentarioRepositoryGetter,);
    this.registerInclusionResolver('comentarios', this.comentarios.inclusionResolver);
  }
}
