import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {GrupoXAficionado} from '../models';
import {GrupoXAficionadoRepository} from '../repositories';

export class GrupoXAficionadoController {
  constructor(
    @repository(GrupoXAficionadoRepository)
    public grupoXAficionadoRepository : GrupoXAficionadoRepository,
  ) {}

  @post('/grupo-x-aficionados', {
    responses: {
      '200': {
        description: 'GrupoXAficionado model instance',
        content: {'application/json': {schema: getModelSchemaRef(GrupoXAficionado)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrupoXAficionado, {
            title: 'NewGrupoXAficionado',
            exclude: ['idGrupoXAficionado'],
          }),
        },
      },
    })
    grupoXAficionado: Omit<GrupoXAficionado, 'idGrupoXAficionado'>,
  ): Promise<GrupoXAficionado> {
    return this.grupoXAficionadoRepository.create(grupoXAficionado);
  }

  @get('/grupo-x-aficionados/count', {
    responses: {
      '200': {
        description: 'GrupoXAficionado model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(GrupoXAficionado) where?: Where<GrupoXAficionado>,
  ): Promise<Count> {
    return this.grupoXAficionadoRepository.count(where);
  }

  @get('/grupo-x-aficionados', {
    responses: {
      '200': {
        description: 'Array of GrupoXAficionado model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(GrupoXAficionado, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(GrupoXAficionado) filter?: Filter<GrupoXAficionado>,
  ): Promise<GrupoXAficionado[]> {
    return this.grupoXAficionadoRepository.find(filter);
  }

  @patch('/grupo-x-aficionados', {
    responses: {
      '200': {
        description: 'GrupoXAficionado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrupoXAficionado, {partial: true}),
        },
      },
    })
    grupoXAficionado: GrupoXAficionado,
    @param.where(GrupoXAficionado) where?: Where<GrupoXAficionado>,
  ): Promise<Count> {
    return this.grupoXAficionadoRepository.updateAll(grupoXAficionado, where);
  }

  @get('/grupo-x-aficionados/{id}', {
    responses: {
      '200': {
        description: 'GrupoXAficionado model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(GrupoXAficionado, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(GrupoXAficionado, {exclude: 'where'}) filter?: FilterExcludingWhere<GrupoXAficionado>
  ): Promise<GrupoXAficionado> {
    return this.grupoXAficionadoRepository.findById(id, filter);
  }

  @patch('/grupo-x-aficionados/{id}', {
    responses: {
      '204': {
        description: 'GrupoXAficionado PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrupoXAficionado, {partial: true}),
        },
      },
    })
    grupoXAficionado: GrupoXAficionado,
  ): Promise<void> {
    await this.grupoXAficionadoRepository.updateById(id, grupoXAficionado);
  }

  @put('/grupo-x-aficionados/{id}', {
    responses: {
      '204': {
        description: 'GrupoXAficionado PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() grupoXAficionado: GrupoXAficionado,
  ): Promise<void> {
    await this.grupoXAficionadoRepository.replaceById(id, grupoXAficionado);
  }

  @del('/grupo-x-aficionados/{id}', {
    responses: {
      '204': {
        description: 'GrupoXAficionado DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.grupoXAficionadoRepository.deleteById(id);
  }
}
