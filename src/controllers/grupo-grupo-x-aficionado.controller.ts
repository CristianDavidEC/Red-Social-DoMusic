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
  GrupoXAficionado,
} from '../models';
import {GrupoRepository} from '../repositories';

export class GrupoGrupoXAficionadoController {
  constructor(
    @repository(GrupoRepository)
    public grupoRepository: GrupoRepository,
  ) { }

  @get('/grupos/{id}/grupo-x-aficionado', {
    responses: {
      '200': {
        description: 'GrupoXAficionado belonging to Grupo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(GrupoXAficionado)},
          },
        },
      },
    },
  })
  async getGrupoXAficionado(
    @param.path.string('id') id: typeof Grupo.prototype.idGrupo,
  ): Promise<GrupoXAficionado> {
    return this.grupoRepository.grupoXAficionado(id);
  }
}
