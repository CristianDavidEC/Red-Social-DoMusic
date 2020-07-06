import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Banda,
  Usuario,
} from '../models';
import {BandaRepository} from '../repositories';

export class BandaUsuarioController {
  constructor(
    @repository(BandaRepository)
    public bandaRepository: BandaRepository,
  ) { }

  @get('/bandas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Banda',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Banda.prototype.idBanda,
  ): Promise<Usuario> {
    return this.bandaRepository.usuario(id);
  }
}
