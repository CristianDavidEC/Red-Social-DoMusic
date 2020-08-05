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
import {DenunciaXPubli} from '../models';
import {DenunciaXPubliRepository} from '../repositories';

export class DenunciaXPubliController {
  constructor(
    @repository(DenunciaXPubliRepository)
    public denunciaXPubliRepository : DenunciaXPubliRepository,
  ) {}

  @authenticate('TokenMusProfesionalStrategy' && 'TokenBandaStrategy' && 'TokenAficionadoStrategy')

  @post('/denuncia-x-publis', {
    responses: {
      '200': {
        description: 'DenunciaXPubli model instance',
        content: {'application/json': {schema: getModelSchemaRef(DenunciaXPubli)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DenunciaXPubli, {
            title: 'NewDenunciaXPubli',
            exclude: ['idDenunciaXPubli'],
          }),
        },
      },
    })
    denunciaXPubli: Omit<DenunciaXPubli, 'idDenunciaXPubli'>,
  ): Promise<DenunciaXPubli> {
    return this.denunciaXPubliRepository.create(denunciaXPubli);
  }

  @authenticate('TokenAdminStrategy')
  @get('/denuncia-x-publis/count', {
    responses: {
      '200': {
        description: 'DenunciaXPubli model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(DenunciaXPubli) where?: Where<DenunciaXPubli>,
  ): Promise<Count> {
    return this.denunciaXPubliRepository.count(where);
  }

  @authenticate('TokenAdminStrategy')
  @get('/denuncia-x-publis', {
    responses: {
      '200': {
        description: 'Array of DenunciaXPubli model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(DenunciaXPubli, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(DenunciaXPubli) filter?: Filter<DenunciaXPubli>,
  ): Promise<DenunciaXPubli[]> {
    return this.denunciaXPubliRepository.find(filter);
  }

  /* @patch('/denuncia-x-publis', {
    responses: {
      '200': {
        description: 'DenunciaXPubli PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DenunciaXPubli, {partial: true}),
        },
      },
    })
    denunciaXPubli: DenunciaXPubli,
    @param.where(DenunciaXPubli) where?: Where<DenunciaXPubli>,
  ): Promise<Count> {
    return this.denunciaXPubliRepository.updateAll(denunciaXPubli, where);
  }
 */

  @authenticate('TokenAdminStrategy')
  @get('/denuncia-x-publis/{id}', {
    responses: {
      '200': {
        description: 'DenunciaXPubli model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DenunciaXPubli, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DenunciaXPubli, {exclude: 'where'}) filter?: FilterExcludingWhere<DenunciaXPubli>
  ): Promise<DenunciaXPubli> {
    return this.denunciaXPubliRepository.findById(id, filter);
  }

  /* @patch('/denuncia-x-publis/{id}', {
    responses: {
      '204': {
        description: 'DenunciaXPubli PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DenunciaXPubli, {partial: true}),
        },
      },
    })
    denunciaXPubli: DenunciaXPubli,
  ): Promise<void> {
    await this.denunciaXPubliRepository.updateById(id, denunciaXPubli);
  } */

  /* @put('/denuncia-x-publis/{id}', {
    responses: {
      '204': {
        description: 'DenunciaXPubli PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() denunciaXPubli: DenunciaXPubli,
  ): Promise<void> {
    await this.denunciaXPubliRepository.replaceById(id, denunciaXPubli);
  } */

  @authenticate('BasicStrategy')
  @del('/denuncia-x-publis/{id}', {
    responses: {
      '204': {
        description: 'DenunciaXPubli DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.denunciaXPubliRepository.deleteById(id);
  }
}
