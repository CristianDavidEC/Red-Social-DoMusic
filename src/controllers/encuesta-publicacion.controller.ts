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
  Encuesta,
  Publicacion,
} from '../models';
import {EncuestaRepository} from '../repositories';

export class EncuestaPublicacionController {
  constructor(
    @repository(EncuestaRepository) protected encuestaRepository: EncuestaRepository,
  ) { }

  @get('/encuestas/{id}/publicacion', {
    responses: {
      '200': {
        description: 'Encuesta has one Publicacion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Publicacion),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Publicacion>,
  ): Promise<Publicacion> {
    return this.encuestaRepository.publicacion(id).get(filter);
  }

  @post('/encuestas/{id}/publicacion', {
    responses: {
      '200': {
        description: 'Encuesta model instance',
        content: {'application/json': {schema: getModelSchemaRef(Publicacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Encuesta.prototype.idEncuesta,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicacion, {
            title: 'NewPublicacionInEncuesta',
            exclude: ['idPublicacion'],
            optional: ['encuestaId']
          }),
        },
      },
    }) publicacion: Omit<Publicacion, 'idPublicacion'>,
  ): Promise<Publicacion> {
    return this.encuestaRepository.publicacion(id).create(publicacion);
  }

  @patch('/encuestas/{id}/publicacion', {
    responses: {
      '200': {
        description: 'Encuesta.Publicacion PATCH success count',
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
    return this.encuestaRepository.publicacion(id).patch(publicacion, where);
  }

  @del('/encuestas/{id}/publicacion', {
    responses: {
      '200': {
        description: 'Encuesta.Publicacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Publicacion)) where?: Where<Publicacion>,
  ): Promise<Count> {
    return this.encuestaRepository.publicacion(id).delete(where);
  }
}
