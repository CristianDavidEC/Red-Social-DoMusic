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
  Publicacion,
} from '../models';
import {MusicoProfesionalRepository} from '../repositories';

export class MusicoProfesionalPublicacionController {
  constructor(
    @repository(MusicoProfesionalRepository) protected musicoProfesionalRepository: MusicoProfesionalRepository,
  ) { }

  @get('/musico-profesionals/{id}/publicacions', {
    responses: {
      '200': {
        description: 'Array of MusicoProfesional has many Publicacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Publicacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Publicacion>,
  ): Promise<Publicacion[]> {
    return this.musicoProfesionalRepository.publicacions(id).find(filter);
  }

  @post('/musico-profesionals/{id}/publicacions', {
    responses: {
      '200': {
        description: 'MusicoProfesional model instance',
        content: {'application/json': {schema: getModelSchemaRef(Publicacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof MusicoProfesional.prototype.idMusicoProfesional,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicacion, {
            title: 'NewPublicacionInMusicoProfesional',
            exclude: ['idPublicacion'],
            optional: ['musicoProfesionalId']
          }),
        },
      },
    }) publicacion: Omit<Publicacion, 'idPublicacion'>,
  ): Promise<Publicacion> {
    return this.musicoProfesionalRepository.publicacions(id).create(publicacion);
  }

  @patch('/musico-profesionals/{id}/publicacions', {
    responses: {
      '200': {
        description: 'MusicoProfesional.Publicacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicacion, {partial: true}),
        },
      },
    })
    publicacion: Partial<Publicacion>,
    @param.query.object('where', getWhereSchemaFor(Publicacion)) where?: Where<Publicacion>,
  ): Promise<Count> {
    return this.musicoProfesionalRepository.publicacions(id).patch(publicacion, where);
  }

  @del('/musico-profesionals/{id}/publicacions', {
    responses: {
      '200': {
        description: 'MusicoProfesional.Publicacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Publicacion)) where?: Where<Publicacion>,
  ): Promise<Count> {
    return this.musicoProfesionalRepository.publicacions(id).delete(where);
  }
}
