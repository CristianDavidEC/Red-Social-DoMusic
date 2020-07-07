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
  DenunciaXPubli,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioDenunciaXPubliController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/denuncia-x-publis', {
    responses: {
      '200': {
        description: 'Array of Usuario has many DenunciaXPubli',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DenunciaXPubli)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DenunciaXPubli>,
  ): Promise<DenunciaXPubli[]> {
    return this.usuarioRepository.denunciaXPublis(id).find(filter);
  }

  @post('/usuarios/{id}/denuncia-x-publis', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(DenunciaXPubli)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.idUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DenunciaXPubli, {
            title: 'NewDenunciaXPubliInUsuario',
            exclude: ['idDenunciaXPubli'],
            optional: ['usuarioId']
          }),
        },
      },
    }) denunciaXPubli: Omit<DenunciaXPubli, 'idDenunciaXPubli'>,
  ): Promise<DenunciaXPubli> {
    return this.usuarioRepository.denunciaXPublis(id).create(denunciaXPubli);
  }

  @patch('/usuarios/{id}/denuncia-x-publis', {
    responses: {
      '200': {
        description: 'Usuario.DenunciaXPubli PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DenunciaXPubli, {partial: true}),
        },
      },
    })
    denunciaXPubli: Partial<DenunciaXPubli>,
    @param.query.object('where', getWhereSchemaFor(DenunciaXPubli)) where?: Where<DenunciaXPubli>,
  ): Promise<Count> {
    return this.usuarioRepository.denunciaXPublis(id).patch(denunciaXPubli, where);
  }

  @del('/usuarios/{id}/denuncia-x-publis', {
    responses: {
      '200': {
        description: 'Usuario.DenunciaXPubli DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DenunciaXPubli)) where?: Where<DenunciaXPubli>,
  ): Promise<Count> {
    return this.usuarioRepository.denunciaXPublis(id).delete(where);
  }
}
