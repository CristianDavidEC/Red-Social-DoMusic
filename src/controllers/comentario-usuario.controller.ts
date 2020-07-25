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
  Comentario,
  Usuario,
} from '../models';
import {ComentarioRepository} from '../repositories';

export class ComentarioUsuarioController {
  constructor(
    @repository(ComentarioRepository) protected comentarioRepository: ComentarioRepository,
  ) { }

  @get('/comentarios/{id}/usuario', {
    responses: {
      '200': {
        description: 'Comentario has one Usuario',
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
    return this.comentarioRepository.usuario(id).get(filter);
  }

  @post('/comentarios/{id}/usuario', {
    responses: {
      '200': {
        description: 'Comentario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Comentario.prototype.idComentario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInComentario',
            exclude: ['idUsuario'],
            optional: ['comentarioId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'idUsuario'>,
  ): Promise<Usuario> {
    return this.comentarioRepository.usuario(id).create(usuario);
  }

  @patch('/comentarios/{id}/usuario', {
    responses: {
      '200': {
        description: 'Comentario.Usuario PATCH success count',
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
    return this.comentarioRepository.usuario(id).patch(usuario, where);
  }

  @del('/comentarios/{id}/usuario', {
    responses: {
      '200': {
        description: 'Comentario.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.comentarioRepository.usuario(id).delete(where);
  }
}
