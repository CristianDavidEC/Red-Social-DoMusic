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
  GrupoXMusicoP,
  MusicoProfesional,
} from '../models';
import {GrupoXMusicoPRepository} from '../repositories';

export class GrupoXMusicoPMusicoProfesionalController {
  constructor(
    @repository(GrupoXMusicoPRepository) protected grupoXMusicoPRepository: GrupoXMusicoPRepository,
  ) { }

  @get('/grupo-x-musico-ps/{id}/musico-profesionals', {
    responses: {
      '200': {
        description: 'Array of GrupoXMusicoP has many MusicoProfesional',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MusicoProfesional)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<MusicoProfesional>,
  ): Promise<MusicoProfesional[]> {
    return this.grupoXMusicoPRepository.musicoProfesionals(id).find(filter);
  }

  @post('/grupo-x-musico-ps/{id}/musico-profesionals', {
    responses: {
      '200': {
        description: 'GrupoXMusicoP model instance',
        content: {'application/json': {schema: getModelSchemaRef(MusicoProfesional)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof GrupoXMusicoP.prototype.idGrupoXMusicoP,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MusicoProfesional, {
            title: 'NewMusicoProfesionalInGrupoXMusicoP',
            exclude: ['idMusicoProfesional'],
            optional: ['grupoXMusicoPId']
          }),
        },
      },
    }) musicoProfesional: Omit<MusicoProfesional, 'idMusicoProfesional'>,
  ): Promise<MusicoProfesional> {
    return this.grupoXMusicoPRepository.musicoProfesionals(id).create(musicoProfesional);
  }

  @patch('/grupo-x-musico-ps/{id}/musico-profesionals', {
    responses: {
      '200': {
        description: 'GrupoXMusicoP.MusicoProfesional PATCH success count',
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
    return this.grupoXMusicoPRepository.musicoProfesionals(id).patch(musicoProfesional, where);
  }

  @del('/grupo-x-musico-ps/{id}/musico-profesionals', {
    responses: {
      '200': {
        description: 'GrupoXMusicoP.MusicoProfesional DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(MusicoProfesional)) where?: Where<MusicoProfesional>,
  ): Promise<Count> {
    return this.grupoXMusicoPRepository.musicoProfesionals(id).delete(where);
  }
}
