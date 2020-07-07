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
  Mensaje,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioMensajeController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/mensaje', {
    responses: {
      '200': {
        description: 'Mensaje belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mensaje)},
          },
        },
      },
    },
  })
  async getMensaje(
    @param.path.string('id') id: typeof Usuario.prototype.idUsuario,
  ): Promise<Mensaje> {
    return this.usuarioRepository.mensaje(id);
  }
}
