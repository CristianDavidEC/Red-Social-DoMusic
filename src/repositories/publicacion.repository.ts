import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongadbDataSource} from '../datasources';
import {Banda, Encuesta, Evento, MusicoProfesional, Publicacion, PublicacionRelations, Comentario} from '../models';
import {BandaRepository} from './banda.repository';
import {EncuestaRepository} from './encuesta.repository';
import {EventoRepository} from './evento.repository';
import {MusicoProfesionalRepository} from './musico-profesional.repository';
import {ComentarioRepository} from './comentario.repository';

export class PublicacionRepository extends DefaultCrudRepository<
  Publicacion,
  typeof Publicacion.prototype.idPublicacion,
  PublicacionRelations
  > {

  public readonly evento: BelongsToAccessor<Evento, typeof Publicacion.prototype.idPublicacion>;

  public readonly encuesta: BelongsToAccessor<Encuesta, typeof Publicacion.prototype.idPublicacion>;

  public readonly musicoProfesional: BelongsToAccessor<MusicoProfesional, typeof Publicacion.prototype.idPublicacion>;

  public readonly banda: BelongsToAccessor<Banda, typeof Publicacion.prototype.idPublicacion>;

  public readonly comentarios: HasManyRepositoryFactory<Comentario, typeof Publicacion.prototype.idPublicacion>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('EventoRepository') protected eventoRepositoryGetter: Getter<EventoRepository>, @repository.getter('EncuestaRepository') protected encuestaRepositoryGetter: Getter<EncuestaRepository>, @repository.getter('MusicoProfesionalRepository') protected musicoProfesionalRepositoryGetter: Getter<MusicoProfesionalRepository>, @repository.getter('BandaRepository') protected bandaRepositoryGetter: Getter<BandaRepository>, @repository.getter('ComentarioRepository') protected comentarioRepositoryGetter: Getter<ComentarioRepository>,
  ) {
    super(Publicacion, dataSource);
    this.comentarios = this.createHasManyRepositoryFactoryFor('comentarios', comentarioRepositoryGetter,);
    this.registerInclusionResolver('comentarios', this.comentarios.inclusionResolver);
    this.banda = this.createBelongsToAccessorFor('banda', bandaRepositoryGetter,);
    this.registerInclusionResolver('banda', this.banda.inclusionResolver);
    this.musicoProfesional = this.createBelongsToAccessorFor('musicoProfesional', musicoProfesionalRepositoryGetter,);
    this.registerInclusionResolver('musicoProfesional', this.musicoProfesional.inclusionResolver);
    this.encuesta = this.createBelongsToAccessorFor('encuesta', encuestaRepositoryGetter,);
    this.registerInclusionResolver('encuesta', this.encuesta.inclusionResolver);
    this.evento = this.createBelongsToAccessorFor('evento', eventoRepositoryGetter,);
    this.registerInclusionResolver('evento', this.evento.inclusionResolver);
  }
}
