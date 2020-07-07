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
  MusicoProfesional,
  Usuario,
} from '../models';
import {MusicoProfesionalRepository} from '../repositories';

export class MusicoProfesionalUsuarioController {
  constructor(
    @repository(MusicoProfesionalRepository) protected musicoProfesionalRepository: MusicoProfesionalRepository,
  ) { }

  @get('/musico-profesionals/{id}/usuario', {
    responses: {
      '200': {
        description: 'MusicoProfesional has one Usuario',
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
    return this.musicoProfesionalRepository.usuario(id).get(filter);
  }

  @post('/musico-profesionals/{id}/usuario', {
    responses: {
      '200': {
        description: 'MusicoProfesional model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof MusicoProfesional.prototype.idMusicoProfesional,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInMusicoProfesional',
            exclude: ['idUsuario'],
            optional: ['musicoProfesionalId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'idUsuario'>,
  ): Promise<Usuario> {
    return this.musicoProfesionalRepository.usuario(id).create(usuario);
  }

  @patch('/musico-profesionals/{id}/usuario', {
    responses: {
      '200': {
        description: 'MusicoProfesional.Usuario PATCH success count',
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
    return this.musicoProfesionalRepository.usuario(id).patch(usuario, where);
  }

  @del('/musico-profesionals/{id}/usuario', {
    responses: {
      '200': {
        description: 'MusicoProfesional.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.musicoProfesionalRepository.usuario(id).delete(where);
  }
}
