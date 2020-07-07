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
  Banda,
  Usuario,
} from '../models';
import {BandaRepository} from '../repositories';

export class BandaUsuarioController {
  constructor(
    @repository(BandaRepository) protected bandaRepository: BandaRepository,
  ) { }

  @get('/bandas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Banda has one Usuario',
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
    return this.bandaRepository.usuario(id).get(filter);
  }

  @post('/bandas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Banda model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Banda.prototype.idBanda,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInBanda',
            exclude: ['idUsuario'],
            optional: ['bandaId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'idUsuario'>,
  ): Promise<Usuario> {
    return this.bandaRepository.usuario(id).create(usuario);
  }

  @patch('/bandas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Banda.Usuario PATCH success count',
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
    return this.bandaRepository.usuario(id).patch(usuario, where);
  }

  @del('/bandas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Banda.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.bandaRepository.usuario(id).delete(where);
  }
}
