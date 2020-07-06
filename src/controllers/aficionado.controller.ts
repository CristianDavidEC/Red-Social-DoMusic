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
import {Aficionado} from '../models';
import {AficionadoRepository} from '../repositories';

export class AficionadoController {
  constructor(
    @repository(AficionadoRepository)
    public aficionadoRepository : AficionadoRepository,
  ) {}

  @post('/aficionados', {
    responses: {
      '200': {
        description: 'Aficionado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Aficionado)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aficionado, {
            title: 'NewAficionado',
            exclude: ['idAficionado'],
          }),
        },
      },
    })
    aficionado: Omit<Aficionado, 'id'>,
  ): Promise<Aficionado> {
    return this.aficionadoRepository.create(aficionado);
  }

  @get('/aficionados/count', {
    responses: {
      '200': {
        description: 'Aficionado model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Aficionado) where?: Where<Aficionado>,
  ): Promise<Count> {
    return this.aficionadoRepository.count(where);
  }

  @get('/aficionados', {
    responses: {
      '200': {
        description: 'Array of Aficionado model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Aficionado, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Aficionado) filter?: Filter<Aficionado>,
  ): Promise<Aficionado[]> {
    return this.aficionadoRepository.find(filter);
  }

  @patch('/aficionados', {
    responses: {
      '200': {
        description: 'Aficionado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aficionado, {partial: true}),
        },
      },
    })
    aficionado: Aficionado,
    @param.where(Aficionado) where?: Where<Aficionado>,
  ): Promise<Count> {
    return this.aficionadoRepository.updateAll(aficionado, where);
  }

  @get('/aficionados/{id}', {
    responses: {
      '200': {
        description: 'Aficionado model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Aficionado, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Aficionado, {exclude: 'where'}) filter?: FilterExcludingWhere<Aficionado>
  ): Promise<Aficionado> {
    return this.aficionadoRepository.findById(id, filter);
  }

  @patch('/aficionados/{id}', {
    responses: {
      '204': {
        description: 'Aficionado PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aficionado, {partial: true}),
        },
      },
    })
    aficionado: Aficionado,
  ): Promise<void> {
    await this.aficionadoRepository.updateById(id, aficionado);
  }

  @put('/aficionados/{id}', {
    responses: {
      '204': {
        description: 'Aficionado PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() aficionado: Aficionado,
  ): Promise<void> {
    await this.aficionadoRepository.replaceById(id, aficionado);
  }

  @del('/aficionados/{id}', {
    responses: {
      '204': {
        description: 'Aficionado DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.aficionadoRepository.deleteById(id);
  }
}
