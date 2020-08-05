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
  Comentario,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioComentarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/comentario', {
    responses: {
      '200': {
        description: 'Comentario belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comentario)},
          },
        },
      },
    },
  })
  async getComentario(
    @param.path.string('id') id: typeof Usuario.prototype.idUsuario,
  ): Promise<Comentario> {
    return this.usuarioRepository.comentario(id);
  }
}
