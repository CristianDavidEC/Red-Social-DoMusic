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
  Aficionado,
} from '../models';
import {GrupoXAficionadoRepository} from '../repositories';

export class GrupoXAficionadoAficionadoController {
  constructor(
    @repository(GrupoXAficionadoRepository) protected grupoXAficionadoRepository: GrupoXAficionadoRepository,
  ) { }

  @get('/grupo-x-aficionados/{id}/aficionados', {
    responses: {
      '200': {
        description: 'Array of GrupoXAficionado has many Aficionado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Aficionado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Aficionado>,
  ): Promise<Aficionado[]> {
    return this.grupoXAficionadoRepository.aficionados(id).find(filter);
  }

  @post('/grupo-x-aficionados/{id}/aficionados', {
    responses: {
      '200': {
        description: 'GrupoXAficionado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Aficionado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof GrupoXAficionado.prototype.idGrupoXAficionado,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aficionado, {
            title: 'NewAficionadoInGrupoXAficionado',
            exclude: ['idAficionado'],
            optional: ['grupoXAficionadoId']
          }),
        },
      },
    }) aficionado: Omit<Aficionado, 'idAficionado'>,
  ): Promise<Aficionado> {
    return this.grupoXAficionadoRepository.aficionados(id).create(aficionado);
  }

  @patch('/grupo-x-aficionados/{id}/aficionados', {
    responses: {
      '200': {
        description: 'GrupoXAficionado.Aficionado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aficionado, {partial: true}),
        },
      },
    })
    aficionado: Partial<Aficionado>,
    @param.query.object('where', getWhereSchemaFor(Aficionado)) where?: Where<Aficionado>,
  ): Promise<Count> {
    return this.grupoXAficionadoRepository.aficionados(id).patch(aficionado, where);
  }

  @del('/grupo-x-aficionados/{id}/aficionados', {
    responses: {
      '200': {
        description: 'GrupoXAficionado.Aficionado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Aficionado)) where?: Where<Aficionado>,
  ): Promise<Count> {
    return this.grupoXAficionadoRepository.aficionados(id).delete(where);
  }
}
