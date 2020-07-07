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
  Mensaje,
  Usuario,
} from '../models';
import {MensajeRepository} from '../repositories';

export class MensajeUsuarioController {
  constructor(
    @repository(MensajeRepository) protected mensajeRepository: MensajeRepository,
  ) { }

  @get('/mensajes/{id}/usuario', {
    responses: {
      '200': {
        description: 'Mensaje has one Usuario',
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
    return this.mensajeRepository.usuario(id).get(filter);
  }

  @post('/mensajes/{id}/usuario', {
    responses: {
      '200': {
        description: 'Mensaje model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mensaje.prototype.idMensaje,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInMensaje',
            exclude: ['idUsuario'],
            optional: ['mensajeId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'idUsuario'>,
  ): Promise<Usuario> {
    return this.mensajeRepository.usuario(id).create(usuario);
  }

  @patch('/mensajes/{id}/usuario', {
    responses: {
      '200': {
        description: 'Mensaje.Usuario PATCH success count',
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
    return this.mensajeRepository.usuario(id).patch(usuario, where);
  }

  @del('/mensajes/{id}/usuario', {
    responses: {
      '200': {
        description: 'Mensaje.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.mensajeRepository.usuario(id).delete(where);
  }
}
