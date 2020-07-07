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
  Publicacion,
} from '../models';
import {BandaRepository} from '../repositories';

export class BandaPublicacionController {
  constructor(
    @repository(BandaRepository) protected bandaRepository: BandaRepository,
  ) { }

  @get('/bandas/{id}/publicacions', {
    responses: {
      '200': {
        description: 'Array of Banda has many Publicacion',
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
    return this.bandaRepository.publicacions(id).find(filter);
  }

  @post('/bandas/{id}/publicacions', {
    responses: {
      '200': {
        description: 'Banda model instance',
        content: {'application/json': {schema: getModelSchemaRef(Publicacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Banda.prototype.idBanda,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicacion, {
            title: 'NewPublicacionInBanda',
            exclude: ['idPublicacion'],
            optional: ['bandaId']
          }),
        },
      },
    }) publicacion: Omit<Publicacion, 'idPublicacion'>,
  ): Promise<Publicacion> {
    return this.bandaRepository.publicacions(id).create(publicacion);
  }

  @patch('/bandas/{id}/publicacions', {
    responses: {
      '200': {
        description: 'Banda.Publicacion PATCH success count',
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
    return this.bandaRepository.publicacions(id).patch(publicacion, where);
  }

  @del('/bandas/{id}/publicacions', {
    responses: {
      '200': {
        description: 'Banda.Publicacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Publicacion)) where?: Where<Publicacion>,
  ): Promise<Count> {
    return this.bandaRepository.publicacions(id).delete(where);
  }
}
