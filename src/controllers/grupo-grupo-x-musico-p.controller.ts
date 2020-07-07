import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Grupo,
  GrupoXMusicoP,
} from '../models';
import {GrupoRepository} from '../repositories';

export class GrupoGrupoXMusicoPController {
  constructor(
    @repository(GrupoRepository)
    public grupoRepository: GrupoRepository,
  ) { }

  @get('/grupos/{id}/grupo-x-musico-p', {
    responses: {
      '200': {
        description: 'GrupoXMusicoP belonging to Grupo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(GrupoXMusicoP)},
          },
        },
      },
    },
  })
  async getGrupoXMusicoP(
    @param.path.string('id') id: typeof Grupo.prototype.idGrupo,
  ): Promise<GrupoXMusicoP> {
    return this.grupoRepository.grupoXMusicoP(id);
  }
}
