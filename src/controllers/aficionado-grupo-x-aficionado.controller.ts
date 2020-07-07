import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Aficionado,
  GrupoXAficionado,
} from '../models';
import {AficionadoRepository} from '../repositories';

export class AficionadoGrupoXAficionadoController {
  constructor(
    @repository(AficionadoRepository)
    public aficionadoRepository: AficionadoRepository,
  ) { }

  @get('/aficionados/{id}/grupo-x-aficionado', {
    responses: {
      '200': {
        description: 'GrupoXAficionado belonging to Aficionado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(GrupoXAficionado)},
          },
        },
      },
    },
  })
  async getGrupoXAficionado(
    @param.path.string('id') id: typeof Aficionado.prototype.idAficionado,
  ): Promise<GrupoXAficionado> {
    return this.aficionadoRepository.grupoXAficionado(id);
  }
}
