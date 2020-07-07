import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Publicacion,
  MusicoProfesional,
} from '../models';
import {PublicacionRepository} from '../repositories';

export class PublicacionMusicoProfesionalController {
  constructor(
    @repository(PublicacionRepository)
    public publicacionRepository: PublicacionRepository,
  ) { }

  @get('/publicacions/{id}/musico-profesional', {
    responses: {
      '200': {
        description: 'MusicoProfesional belonging to Publicacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MusicoProfesional)},
          },
        },
      },
    },
  })
  async getMusicoProfesional(
    @param.path.string('id') id: typeof Publicacion.prototype.idPublicacion,
  ): Promise<MusicoProfesional> {
    return this.publicacionRepository.musicoProfesional(id);
  }
}
