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
  Banda,
} from '../models';
import {PublicacionRepository} from '../repositories';

export class PublicacionBandaController {
  constructor(
    @repository(PublicacionRepository)
    public publicacionRepository: PublicacionRepository,
  ) { }

  @get('/publicacions/{id}/banda', {
    responses: {
      '200': {
        description: 'Banda belonging to Publicacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Banda)},
          },
        },
      },
    },
  })
  async getBanda(
    @param.path.string('id') id: typeof Publicacion.prototype.idPublicacion,
  ): Promise<Banda> {
    return this.publicacionRepository.banda(id);
  }
}
