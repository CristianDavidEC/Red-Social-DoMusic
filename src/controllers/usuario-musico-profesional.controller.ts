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
  MusicoProfesional,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioMusicoProfesionalController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/musico-profesional', {
    responses: {
      '200': {
        description: 'Usuario has one MusicoProfesional',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MusicoProfesional),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<MusicoProfesional>,
  ): Promise<MusicoProfesional> {
    return this.usuarioRepository.musicoProfesional(id).get(filter);
  }

  @post('/usuarios/{id}/musico-profesional', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(MusicoProfesional)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.idUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MusicoProfesional, {
            title: 'NewMusicoProfesionalInUsuario',
            exclude: ['idMusicoProfesional'],
            optional: ['usuarioId']
          }),
        },
      },
    }) musicoProfesional: Omit<MusicoProfesional, 'idMusicoProfesional'>,
  ): Promise<MusicoProfesional> {
    return this.usuarioRepository.musicoProfesional(id).create(musicoProfesional);
  }

  @patch('/usuarios/{id}/musico-profesional', {
    responses: {
      '200': {
        description: 'Usuario.MusicoProfesional PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MusicoProfesional, {partial: true}),
        },
      },
    })
    musicoProfesional: Partial<MusicoProfesional>,
    @param.query.object('where', getWhereSchemaFor(MusicoProfesional)) where?: Where<MusicoProfesional>,
  ): Promise<Count> {
    return this.usuarioRepository.musicoProfesional(id).patch(musicoProfesional, where);
  }

  @del('/usuarios/{id}/musico-profesional', {
    responses: {
      '200': {
        description: 'Usuario.MusicoProfesional DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(MusicoProfesional)) where?: Where<MusicoProfesional>,
  ): Promise<Count> {
    return this.usuarioRepository.musicoProfesional(id).delete(where);
  }
}
