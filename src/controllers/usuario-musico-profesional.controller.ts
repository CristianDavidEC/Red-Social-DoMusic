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
  MusicoProfesional,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioMusicoProfesionalController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/musico-profesional', {
    responses: {
      '200': {
        description: 'MusicoProfesional belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MusicoProfesional)},
          },
        },
      },
    },
  })
  async getMusicoProfesional(
    @param.path.string('id') id: typeof Usuario.prototype.idUsuario,
  ): Promise<MusicoProfesional> {
    return this.usuarioRepository.musicoProfesional(id);
  }
}
