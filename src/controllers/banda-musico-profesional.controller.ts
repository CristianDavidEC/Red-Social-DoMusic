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
  MusicoProfesional,
} from '../models';
import {BandaRepository} from '../repositories';

export class BandaMusicoProfesionalController {
  constructor(
    @repository(BandaRepository) protected bandaRepository: BandaRepository,
  ) { }

  @get('/bandas/{id}/musico-profesionals', {
    responses: {
      '200': {
        description: 'Array of Banda has many MusicoProfesional',
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
    return this.bandaRepository.musicoProfesionales(id).find(filter);
  }

  @post('/bandas/{id}/musico-profesionals', {
    responses: {
      '200': {
        description: 'Banda model instance',
        content: {'application/json': {schema: getModelSchemaRef(MusicoProfesional)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Banda.prototype.idBanda,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MusicoProfesional, {
            title: 'NewMusicoProfesionalInBanda',
            exclude: ['idMusicoProfesional'],
            optional: ['bandaId']
          }),
        },
      },
    }) musicoProfesional: Omit<MusicoProfesional, 'idMusicoProfesional'>,
  ): Promise<MusicoProfesional> {
    return this.bandaRepository.musicoProfesionales(id).create(musicoProfesional);
  }

  @patch('/bandas/{id}/musico-profesionals', {
    responses: {
      '200': {
        description: 'Banda.MusicoProfesional PATCH success count',
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
    return this.bandaRepository.musicoProfesionales(id).patch(musicoProfesional, where);
  }

  @del('/bandas/{id}/musico-profesionals', {
    responses: {
      '200': {
        description: 'Banda.MusicoProfesional DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(MusicoProfesional)) where?: Where<MusicoProfesional>,
  ): Promise<Count> {
    return this.bandaRepository.musicoProfesionales(id).delete(where);
  }
}
