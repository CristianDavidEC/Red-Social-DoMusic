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
import {GrupoXMusicoP} from '../models';
import {GrupoXMusicoPRepository} from '../repositories';

export class GrupoXMusicoPController {
  constructor(
    @repository(GrupoXMusicoPRepository)
    public grupoXMusicoPRepository : GrupoXMusicoPRepository,
  ) {}

  @post('/grupo-x-musico-ps', {
    responses: {
      '200': {
        description: 'GrupoXMusicoP model instance',
        content: {'application/json': {schema: getModelSchemaRef(GrupoXMusicoP)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrupoXMusicoP, {
            title: 'NewGrupoXMusicoP',
            exclude: ['idGrupoXMusicoP'],
          }),
        },
      },
    })
    grupoXMusicoP: Omit<GrupoXMusicoP, 'idGrupoXMusicoP'>,
  ): Promise<GrupoXMusicoP> {
    return this.grupoXMusicoPRepository.create(grupoXMusicoP);
  }

  @get('/grupo-x-musico-ps/count', {
    responses: {
      '200': {
        description: 'GrupoXMusicoP model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(GrupoXMusicoP) where?: Where<GrupoXMusicoP>,
  ): Promise<Count> {
    return this.grupoXMusicoPRepository.count(where);
  }

  @get('/grupo-x-musico-ps', {
    responses: {
      '200': {
        description: 'Array of GrupoXMusicoP model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(GrupoXMusicoP, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(GrupoXMusicoP) filter?: Filter<GrupoXMusicoP>,
  ): Promise<GrupoXMusicoP[]> {
    return this.grupoXMusicoPRepository.find(filter);
  }

  @patch('/grupo-x-musico-ps', {
    responses: {
      '200': {
        description: 'GrupoXMusicoP PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrupoXMusicoP, {partial: true}),
        },
      },
    })
    grupoXMusicoP: GrupoXMusicoP,
    @param.where(GrupoXMusicoP) where?: Where<GrupoXMusicoP>,
  ): Promise<Count> {
    return this.grupoXMusicoPRepository.updateAll(grupoXMusicoP, where);
  }

  @get('/grupo-x-musico-ps/{id}', {
    responses: {
      '200': {
        description: 'GrupoXMusicoP model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(GrupoXMusicoP, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(GrupoXMusicoP, {exclude: 'where'}) filter?: FilterExcludingWhere<GrupoXMusicoP>
  ): Promise<GrupoXMusicoP> {
    return this.grupoXMusicoPRepository.findById(id, filter);
  }

  @patch('/grupo-x-musico-ps/{id}', {
    responses: {
      '204': {
        description: 'GrupoXMusicoP PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrupoXMusicoP, {partial: true}),
        },
      },
    })
    grupoXMusicoP: GrupoXMusicoP,
  ): Promise<void> {
    await this.grupoXMusicoPRepository.updateById(id, grupoXMusicoP);
  }

  @put('/grupo-x-musico-ps/{id}', {
    responses: {
      '204': {
        description: 'GrupoXMusicoP PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() grupoXMusicoP: GrupoXMusicoP,
  ): Promise<void> {
    await this.grupoXMusicoPRepository.replaceById(id, grupoXMusicoP);
  }

  @del('/grupo-x-musico-ps/{id}', {
    responses: {
      '204': {
        description: 'GrupoXMusicoP DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.grupoXMusicoPRepository.deleteById(id);
  }
}
