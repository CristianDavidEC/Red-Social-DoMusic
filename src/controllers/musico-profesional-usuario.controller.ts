import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MusicoProfesional,
  Usuario,
} from '../models';
import {MusicoProfesionalRepository} from '../repositories';

export class MusicoProfesionalUsuarioController {
  constructor(
    @repository(MusicoProfesionalRepository)
    public musicoProfesionalRepository: MusicoProfesionalRepository,
  ) { }

  @get('/musico-profesionals/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to MusicoProfesional',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof MusicoProfesional.prototype.idMusicoProfesional,
  ): Promise<Usuario> {
    return this.musicoProfesionalRepository.usuario(id);
  }
}
