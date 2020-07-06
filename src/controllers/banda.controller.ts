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
import {Banda} from '../models';
import {BandaRepository} from '../repositories';

export class BandaController {
  constructor(
    @repository(BandaRepository)
    public bandaRepository : BandaRepository,
  ) {}

  @post('/bandas', {
    responses: {
      '200': {
        description: 'Banda model instance',
        content: {'application/json': {schema: getModelSchemaRef(Banda)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Banda, {
            title: 'NewBanda',
            exclude: ['idBanda'],
          }),
        },
      },
    })
    banda: Omit<Banda, 'id'>,
  ): Promise<Banda> {
    return this.bandaRepository.create(banda);
  }

  @get('/bandas/count', {
    responses: {
      '200': {
        description: 'Banda model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Banda) where?: Where<Banda>,
  ): Promise<Count> {
    return this.bandaRepository.count(where);
  }

  @get('/bandas', {
    responses: {
      '200': {
        description: 'Array of Banda model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Banda, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Banda) filter?: Filter<Banda>,
  ): Promise<Banda[]> {
    return this.bandaRepository.find(filter);
  }

  @patch('/bandas', {
    responses: {
      '200': {
        description: 'Banda PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Banda, {partial: true}),
        },
      },
    })
    banda: Banda,
    @param.where(Banda) where?: Where<Banda>,
  ): Promise<Count> {
    return this.bandaRepository.updateAll(banda, where);
  }

  @get('/bandas/{id}', {
    responses: {
      '200': {
        description: 'Banda model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Banda, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Banda, {exclude: 'where'}) filter?: FilterExcludingWhere<Banda>
  ): Promise<Banda> {
    return this.bandaRepository.findById(id, filter);
  }

  @patch('/bandas/{id}', {
    responses: {
      '204': {
        description: 'Banda PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Banda, {partial: true}),
        },
      },
    })
    banda: Banda,
  ): Promise<void> {
    await this.bandaRepository.updateById(id, banda);
  }

  @put('/bandas/{id}', {
    responses: {
      '204': {
        description: 'Banda PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() banda: Banda,
  ): Promise<void> {
    await this.bandaRepository.replaceById(id, banda);
  }

  @del('/bandas/{id}', {
    responses: {
      '204': {
        description: 'Banda DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.bandaRepository.deleteById(id);
  }
}
