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
  Notificacion,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioNotificacionController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/notificacion', {
    responses: {
      '200': {
        description: 'Notificacion belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Notificacion)},
          },
        },
      },
    },
  })
  async getNotificacion(
    @param.path.string('id') id: typeof Usuario.prototype.idUsuario,
  ): Promise<Notificacion> {
    return this.usuarioRepository.notificacion(id);
  }
}
