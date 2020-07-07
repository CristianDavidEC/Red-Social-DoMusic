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
  GrupoXMusicoP,
  Grupo,
} from '../models';
import {GrupoXMusicoPRepository} from '../repositories';

export class GrupoXMusicoPGrupoController {
  constructor(
    @repository(GrupoXMusicoPRepository) protected grupoXMusicoPRepository: GrupoXMusicoPRepository,
  ) { }

  @get('/grupo-x-musico-ps/{id}/grupos', {
    responses: {
      '200': {
        description: 'Array of GrupoXMusicoP has many Grupo',
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
    return this.grupoXMusicoPRepository.grupos(id).find(filter);
  }

  @post('/grupo-x-musico-ps/{id}/grupos', {
    responses: {
      '200': {
        description: 'GrupoXMusicoP model instance',
        content: {'application/json': {schema: getModelSchemaRef(Grupo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof GrupoXMusicoP.prototype.idGrupoXMusicoP,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {
            title: 'NewGrupoInGrupoXMusicoP',
            exclude: ['idGrupo'],
            optional: ['grupoXMusicoPId']
          }),
        },
      },
    }) grupo: Omit<Grupo, 'idGrupo'>,
  ): Promise<Grupo> {
    return this.grupoXMusicoPRepository.grupos(id).create(grupo);
  }

  @patch('/grupo-x-musico-ps/{id}/grupos', {
    responses: {
      '200': {
        description: 'GrupoXMusicoP.Grupo PATCH success count',
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
    return this.grupoXMusicoPRepository.grupos(id).patch(grupo, where);
  }

  @del('/grupo-x-musico-ps/{id}/grupos', {
    responses: {
      '200': {
        description: 'GrupoXMusicoP.Grupo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Grupo)) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.grupoXMusicoPRepository.grupos(id).delete(where);
  }
}
