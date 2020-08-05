import {authenticate} from '@loopback/authentication';
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
import {Grupo} from '../models';
import {GrupoRepository} from '../repositories';

export class GrupoController {
  constructor(
    @repository(GrupoRepository)
    public grupoRepository : GrupoRepository,
  ) {}

  @authenticate('TokenMusProfesionalStrategy')
  @post('/grupos', {
    responses: {
      '200': {
        description: 'Grupo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Grupo)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {
            title: 'NewGrupo',
            exclude: ['idGrupo'],
          }),
        },
      },
    })
    grupo: Omit<Grupo, 'idGrupo'>,
  ): Promise<Grupo> {
    return this.grupoRepository.create(grupo);
  }

  @authenticate('TokenMusProfesionalStrategy' && 'TokenAficionadoStrategy' && 'TokenAdminStrategy')
  @get('/grupos/count', {
    responses: {
      '200': {
        description: 'Grupo model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Grupo) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.grupoRepository.count(where);
  }

  @authenticate('TokenMusProfesionalStrategy' && 'TokenAficionadoStrategy' && 'TokenAdminStrategy')
  @get('/grupos', {
    responses: {
      '200': {
        description: 'Array of Grupo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Grupo, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Grupo) filter?: Filter<Grupo>,
  ): Promise<Grupo[]> {
    return this.grupoRepository.find(filter);
  }

  @authenticate('TokenMusProfesionalStrategy' )
  @patch('/grupos', {
    responses: {
      '200': {
        description: 'Grupo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {partial: true}),
        },
      },
    })
    grupo: Grupo,
    @param.where(Grupo) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.grupoRepository.updateAll(grupo, where);
  }

  @authenticate('TokenMusProfesionalStrategy' && 'TokenAficionadoStrategy' && 'TokenAdminStrategy')
  @get('/grupos/{id}', {
    responses: {
      '200': {
        description: 'Grupo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Grupo, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Grupo, {exclude: 'where'}) filter?: FilterExcludingWhere<Grupo>
  ): Promise<Grupo> {
    return this.grupoRepository.findById(id, filter);
  }

  @authenticate('TokenMusProfesionalStrategy' )
  @patch('/grupos/{id}', {
    responses: {
      '204': {
        description: 'Grupo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {partial: true}),
        },
      },
    })
    grupo: Grupo,
  ): Promise<void> {
    await this.grupoRepository.updateById(id, grupo);
  }

  @authenticate('TokenMusProfesionalStrategy' )
  @put('/grupos/{id}', {
    responses: {
      '204': {
        description: 'Grupo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() grupo: Grupo,
  ): Promise<void> {
    await this.grupoRepository.replaceById(id, grupo);
  }

  @authenticate('TokenMusProfesionalStrategy' && 'TokenAdminStrategy')
  @del('/grupos/{id}', {
    responses: {
      '204': {
        description: 'Grupo DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.grupoRepository.deleteById(id);
  }
}
