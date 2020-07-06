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
  Administrador,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioAdministradorController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/administrador', {
    responses: {
      '200': {
        description: 'Usuario has one Administrador',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Administrador),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Administrador>,
  ): Promise<Administrador> {
    return this.usuarioRepository.administrador(id).get(filter);
  }

  @post('/usuarios/{id}/administrador', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Administrador)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.idUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {
            title: 'NewAdministradorInUsuario',
            exclude: ['idAdministrador'],
            optional: ['usuarioId']
          }),
        },
      },
    }) administrador: Omit<Administrador, 'idAdministrador'>,
  ): Promise<Administrador> {
    return this.usuarioRepository.administrador(id).create(administrador);
  }

  @patch('/usuarios/{id}/administrador', {
    responses: {
      '200': {
        description: 'Usuario.Administrador PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {partial: true}),
        },
      },
    })
    administrador: Partial<Administrador>,
    @param.query.object('where', getWhereSchemaFor(Administrador)) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.usuarioRepository.administrador(id).patch(administrador, where);
  }

  @del('/usuarios/{id}/administrador', {
    responses: {
      '200': {
        description: 'Usuario.Administrador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Administrador)) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.usuarioRepository.administrador(id).delete(where);
  }
}
