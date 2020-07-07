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
  Banda,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioBandaController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/banda', {
    responses: {
      '200': {
        description: 'Banda belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Banda)},
          },
        },
      },
    },
  })
  async getBanda(
    @param.path.string('id') id: typeof Usuario.prototype.idUsuario,
  ): Promise<Banda> {
    return this.usuarioRepository.banda(id);
  }
}
