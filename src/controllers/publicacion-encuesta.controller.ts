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
  Encuesta,
} from '../models';
import {PublicacionRepository} from '../repositories';

export class PublicacionEncuestaController {
  constructor(
    @repository(PublicacionRepository)
    public publicacionRepository: PublicacionRepository,
  ) { }

  @get('/publicacions/{id}/encuesta', {
    responses: {
      '200': {
        description: 'Encuesta belonging to Publicacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Encuesta)},
          },
        },
      },
    },
  })
  async getEncuesta(
    @param.path.string('id') id: typeof Publicacion.prototype.idPublicacion,
  ): Promise<Encuesta> {
    return this.publicacionRepository.encuesta(id);
  }
}
