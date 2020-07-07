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
  Aficionado,
  Usuario,
} from '../models';
import {AficionadoRepository} from '../repositories';

export class AficionadoUsuarioController {
  constructor(
    @repository(AficionadoRepository) protected aficionadoRepository: AficionadoRepository,
  ) { }

  @get('/aficionados/{id}/usuario', {
    responses: {
      '200': {
        description: 'Aficionado has one Usuario',
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
    return this.aficionadoRepository.usuario(id).get(filter);
  }

  @post('/aficionados/{id}/usuario', {
    responses: {
      '200': {
        description: 'Aficionado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Aficionado.prototype.idAficionado,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInAficionado',
            exclude: ['idUsuario'],
            optional: ['aficionadoId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'idUsuario'>,
  ): Promise<Usuario> {
    return this.aficionadoRepository.usuario(id).create(usuario);
  }

  @patch('/aficionados/{id}/usuario', {
    responses: {
      '200': {
        description: 'Aficionado.Usuario PATCH success count',
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
    return this.aficionadoRepository.usuario(id).patch(usuario, where);
  }

  @del('/aficionados/{id}/usuario', {
    responses: {
      '200': {
        description: 'Aficionado.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.aficionadoRepository.usuario(id).delete(where);
  }
}
