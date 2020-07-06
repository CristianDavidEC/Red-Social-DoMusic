import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Aficionado,
  Usuario,
} from '../models';
import {AficionadoRepository} from '../repositories';

export class AficionadoUsuarioController {
  constructor(
    @repository(AficionadoRepository)
    public aficionadoRepository: AficionadoRepository,
  ) { }

  @get('/aficionados/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Aficionado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Aficionado.prototype.idAficionado,
  ): Promise<Usuario> {
    return this.aficionadoRepository.usuario(id);
  }
}
