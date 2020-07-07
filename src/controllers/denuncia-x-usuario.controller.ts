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
import {DenunciaXusario} from '../models';
import {DenunciaXusarioRepository} from '../repositories';

export class DenunciaXUsuarioController {
  constructor(
    @repository(DenunciaXusarioRepository)
    public denunciaXusarioRepository : DenunciaXusarioRepository,
  ) {}

  @post('/denuncia-xusarios', {
    responses: {
      '200': {
        description: 'DenunciaXusario model instance',
        content: {'application/json': {schema: getModelSchemaRef(DenunciaXusario)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DenunciaXusario, {
            title: 'NewDenunciaXusario',
            exclude: ['idDenunciaXUsario'],
          }),
        },
      },
    })
    denunciaXusario: Omit<DenunciaXusario, 'idDenunciaXUsario'>,
  ): Promise<DenunciaXusario> {
    return this.denunciaXusarioRepository.create(denunciaXusario);
  }

  @get('/denuncia-xusarios/count', {
    responses: {
      '200': {
        description: 'DenunciaXusario model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(DenunciaXusario) where?: Where<DenunciaXusario>,
  ): Promise<Count> {
    return this.denunciaXusarioRepository.count(where);
  }

  @get('/denuncia-xusarios', {
    responses: {
      '200': {
        description: 'Array of DenunciaXusario model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(DenunciaXusario, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(DenunciaXusario) filter?: Filter<DenunciaXusario>,
  ): Promise<DenunciaXusario[]> {
    return this.denunciaXusarioRepository.find(filter);
  }

  @patch('/denuncia-xusarios', {
    responses: {
      '200': {
        description: 'DenunciaXusario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DenunciaXusario, {partial: true}),
        },
      },
    })
    denunciaXusario: DenunciaXusario,
    @param.where(DenunciaXusario) where?: Where<DenunciaXusario>,
  ): Promise<Count> {
    return this.denunciaXusarioRepository.updateAll(denunciaXusario, where);
  }

  @get('/denuncia-xusarios/{id}', {
    responses: {
      '200': {
        description: 'DenunciaXusario model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DenunciaXusario, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DenunciaXusario, {exclude: 'where'}) filter?: FilterExcludingWhere<DenunciaXusario>
  ): Promise<DenunciaXusario> {
    return this.denunciaXusarioRepository.findById(id, filter);
  }

  @patch('/denuncia-xusarios/{id}', {
    responses: {
      '204': {
        description: 'DenunciaXusario PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DenunciaXusario, {partial: true}),
        },
      },
    })
    denunciaXusario: DenunciaXusario,
  ): Promise<void> {
    await this.denunciaXusarioRepository.updateById(id, denunciaXusario);
  }

  @put('/denuncia-xusarios/{id}', {
    responses: {
      '204': {
        description: 'DenunciaXusario PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() denunciaXusario: DenunciaXusario,
  ): Promise<void> {
    await this.denunciaXusarioRepository.replaceById(id, denunciaXusario);
  }

  @del('/denuncia-xusarios/{id}', {
    responses: {
      '204': {
        description: 'DenunciaXusario DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.denunciaXusarioRepository.deleteById(id);
  }
}
