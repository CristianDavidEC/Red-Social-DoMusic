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
  Banda,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioBandaController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/banda', {
    responses: {
      '200': {
        description: 'Usuario has one Banda',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Banda),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Banda>,
  ): Promise<Banda> {
    return this.usuarioRepository.banda(id).get(filter);
  }

  @post('/usuarios/{id}/banda', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Banda)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.idUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Banda, {
            title: 'NewBandaInUsuario',
            exclude: ['idBanda'],
            optional: ['usuarioId']
          }),
        },
      },
    }) banda: Omit<Banda, 'idBanda'>,
  ): Promise<Banda> {
    return this.usuarioRepository.banda(id).create(banda);
  }

  @patch('/usuarios/{id}/banda', {
    responses: {
      '200': {
        description: 'Usuario.Banda PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Banda, {partial: true}),
        },
      },
    })
    banda: Partial<Banda>,
    @param.query.object('where', getWhereSchemaFor(Banda)) where?: Where<Banda>,
  ): Promise<Count> {
    return this.usuarioRepository.banda(id).patch(banda, where);
  }

  @del('/usuarios/{id}/banda', {
    responses: {
      '200': {
        description: 'Usuario.Banda DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Banda)) where?: Where<Banda>,
  ): Promise<Count> {
    return this.usuarioRepository.banda(id).delete(where);
  }
}
