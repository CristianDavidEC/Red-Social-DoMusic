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
  Evento,
} from '../models';
import {PublicacionRepository} from '../repositories';

export class PublicacionEventoController {
  constructor(
    @repository(PublicacionRepository)
    public publicacionRepository: PublicacionRepository,
  ) { }

  @get('/publicacions/{id}/evento', {
    responses: {
      '200': {
        description: 'Evento belonging to Publicacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Evento)},
          },
        },
      },
    },
  })
  async getEvento(
    @param.path.string('id') id: typeof Publicacion.prototype.idPublicacion,
  ): Promise<Evento> {
    return this.publicacionRepository.evento(id);
  }
}
