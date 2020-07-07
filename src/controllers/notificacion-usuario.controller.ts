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
  Notificacion,
  Usuario,
} from '../models';
import {NotificacionRepository} from '../repositories';

export class NotificacionUsuarioController {
  constructor(
    @repository(NotificacionRepository) protected notificacionRepository: NotificacionRepository,
  ) { }

  @get('/notificacions/{id}/usuario', {
    responses: {
      '200': {
        description: 'Notificacion has one Usuario',
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
    return this.notificacionRepository.usuario(id).get(filter);
  }

  @post('/notificacions/{id}/usuario', {
    responses: {
      '200': {
        description: 'Notificacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Notificacion.prototype.idNotificacion,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInNotificacion',
            exclude: ['idUsuario'],
            optional: ['notificacionId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'idUsuario'>,
  ): Promise<Usuario> {
    return this.notificacionRepository.usuario(id).create(usuario);
  }

  @patch('/notificacions/{id}/usuario', {
    responses: {
      '200': {
        description: 'Notificacion.Usuario PATCH success count',
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
    return this.notificacionRepository.usuario(id).patch(usuario, where);
  }

  @del('/notificacions/{id}/usuario', {
    responses: {
      '200': {
        description: 'Notificacion.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.notificacionRepository.usuario(id).delete(where);
  }
}
