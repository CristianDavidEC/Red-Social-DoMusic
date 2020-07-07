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
  GrupoXMusicoP,
} from '../models';
import {MusicoProfesionalRepository} from '../repositories';

export class MusicoProfesionalGrupoXMusicoPController {
  constructor(
    @repository(MusicoProfesionalRepository)
    public musicoProfesionalRepository: MusicoProfesionalRepository,
  ) { }

  @get('/musico-profesionals/{id}/grupo-x-musico-p', {
    responses: {
      '200': {
        description: 'GrupoXMusicoP belonging to MusicoProfesional',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(GrupoXMusicoP)},
          },
        },
      },
    },
  })
  async getGrupoXMusicoP(
    @param.path.string('id') id: typeof MusicoProfesional.prototype.idMusicoProfesional,
  ): Promise<GrupoXMusicoP> {
    return this.musicoProfesionalRepository.grupoXMusicoP(id);
  }
}
