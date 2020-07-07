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
  Administrador,
  Usuario,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorUsuarioController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/usuario', {
    responses: {
      '200': {
        description: 'Administrador has one Usuario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuario),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario> {
    return this.administradorRepository.usuario(id).get(filter);
  }

  @post('/administradors/{id}/usuario', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administrador.prototype.idAdministrador,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInAdministrador',
            exclude: ['idUsuario'],
            optional: ['administradorId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'idUsuario'>,
  ): Promise<Usuario> {
    return this.administradorRepository.usuario(id).create(usuario);
  }

  @patch('/administradors/{id}/usuario', {
    responses: {
      '200': {
        description: 'Administrador.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.administradorRepository.usuario(id).patch(usuario, where);
  }

  @del('/administradors/{id}/usuario', {
    responses: {
      '200': {
        description: 'Administrador.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.administradorRepository.usuario(id).delete(where);
  }
}
