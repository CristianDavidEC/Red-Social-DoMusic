import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  GrupoXAficionado,
  Grupo,
} from '../models';
import {GrupoXAficionadoRepository} from '../repositories';

export class GrupoXAficionadoGrupoController {
  constructor(
    @repository(GrupoXAficionadoRepository) protected grupoXAficionadoRepository: GrupoXAficionadoRepository,
  ) { }

  @get('/grupo-x-aficionados/{id}/grupos', {
    responses: {
      '200': {
        description: 'Array of GrupoXAficionado has many Grupo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Grupo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Grupo>,
  ): Promise<Grupo[]> {
    return this.grupoXAficionadoRepository.grupos(id).find(filter);
  }

  @post('/grupo-x-aficionados/{id}/grupos', {
    responses: {
      '200': {
        description: 'GrupoXAficionado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Grupo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof GrupoXAficionado.prototype.idGrupoXAficionado,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {
            title: 'NewGrupoInGrupoXAficionado',
            exclude: ['idGrupo'],
            optional: ['grupoXAficionadoId']
          }),
        },
      },
    }) grupo: Omit<Grupo, 'idGrupo'>,
  ): Promise<Grupo> {
    return this.grupoXAficionadoRepository.grupos(id).create(grupo);
  }

  @patch('/grupo-x-aficionados/{id}/grupos', {
    responses: {
      '200': {
        description: 'GrupoXAficionado.Grupo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {partial: true}),
        },
      },
    })
    grupo: Partial<Grupo>,
    @param.query.object('where', getWhereSchemaFor(Grupo)) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.grupoXAficionadoRepository.grupos(id).patch(grupo, where);
  }

  @del('/grupo-x-aficionados/{id}/grupos', {
    responses: {
      '200': {
        description: 'GrupoXAficionado.Grupo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Grupo)) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.grupoXAficionadoRepository.grupos(id).delete(where);
  }
}
