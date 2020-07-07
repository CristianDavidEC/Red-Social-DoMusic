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
  Usuario,
  DenunciaXusario,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioDenunciaXusarioController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/denuncia-xusarios', {
    responses: {
      '200': {
        description: 'Array of Usuario has many DenunciaXusario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DenunciaXusario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DenunciaXusario>,
  ): Promise<DenunciaXusario[]> {
    return this.usuarioRepository.denunciaXusarios(id).find(filter);
  }

  @post('/usuarios/{id}/denuncia-xusarios', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(DenunciaXusario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.idUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DenunciaXusario, {
            title: 'NewDenunciaXusarioInUsuario',
            exclude: ['idDenunciaXusuario'],
            optional: ['usuarioId']
          }),
        },
      },
    }) denunciaXusario: Omit<DenunciaXusario, 'idDenunciaXusuario'>,
  ): Promise<DenunciaXusario> {
    return this.usuarioRepository.denunciaXusarios(id).create(denunciaXusario);
  }

  @patch('/usuarios/{id}/denuncia-xusarios', {
    responses: {
      '200': {
        description: 'Usuario.DenunciaXusario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DenunciaXusario, {partial: true}),
        },
      },
    })
    denunciaXusario: Partial<DenunciaXusario>,
    @param.query.object('where', getWhereSchemaFor(DenunciaXusario)) where?: Where<DenunciaXusario>,
  ): Promise<Count> {
    return this.usuarioRepository.denunciaXusarios(id).patch(denunciaXusario, where);
  }

  @del('/usuarios/{id}/denuncia-xusarios', {
    responses: {
      '200': {
        description: 'Usuario.DenunciaXusario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DenunciaXusario)) where?: Where<DenunciaXusario>,
  ): Promise<Count> {
    return this.usuarioRepository.denunciaXusarios(id).delete(where);
  }
}
