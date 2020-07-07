import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuario,
  Aficionado,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioAficionadoController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/aficionado', {
    responses: {
      '200': {
        description: 'Aficionado belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Aficionado)},
          },
        },
      },
    },
  })
  async getAficionado(
    @param.path.string('id') id: typeof Usuario.prototype.idUsuario,
  ): Promise<Aficionado> {
    return this.usuarioRepository.aficionado(id);
  }
}
