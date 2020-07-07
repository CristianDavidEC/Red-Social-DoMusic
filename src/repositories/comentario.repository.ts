import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {Comentario, ComentarioRelations, Publicacion} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ComentarioRepository} from './comentario.repository';
import {PublicacionRepository} from './publicacion.repository';

export class ComentarioRepository extends DefaultCrudRepository<
  Comentario,
  typeof Comentario.prototype.idComentario,
  ComentarioRelations
> {

  public readonly comentarios: HasManyRepositoryFactory<Comentario, typeof Comentario.prototype.idComentario>;

  public readonly cComentario: BelongsToAccessor<Comentario, typeof Comentario.prototype.idComentario>;

  public readonly publicacion: BelongsToAccessor<Publicacion, typeof Comentario.prototype.idComentario>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('ComentarioRepository') protected comentarioRepositoryGetter: Getter<ComentarioRepository>, @repository.getter('PublicacionRepository') protected publicacionRepositoryGetter: Getter<PublicacionRepository>,
  ) {
    super(Comentario, dataSource);
    this.publicacion = this.createBelongsToAccessorFor('publicacion', publicacionRepositoryGetter,);
    this.registerInclusionResolver('publicacion', this.publicacion.inclusionResolver);
    this.cComentario = this.createBelongsToAccessorFor('cComentario', comentarioRepositoryGetter,);
    this.registerInclusionResolver('cComentario', this.cComentario.inclusionResolver);
    this.comentarios = this.createHasManyRepositoryFactoryFor('comentarios', comentarioRepositoryGetter,);
    this.registerInclusionResolver('comentarios', this.comentarios.inclusionResolver);
  }
}
