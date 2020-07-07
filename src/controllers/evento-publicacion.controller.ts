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
  Evento,
  Publicacion,
} from '../models';
import {EventoRepository} from '../repositories';

export class EventoPublicacionController {
  constructor(
    @repository(EventoRepository) protected eventoRepository: EventoRepository,
  ) { }

  @get('/eventos/{id}/publicacion', {
    responses: {
      '200': {
        description: 'Evento has one Publicacion',
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
    return this.eventoRepository.publicacion(id).get(filter);
  }

  @post('/eventos/{id}/publicacion', {
    responses: {
      '200': {
        description: 'Evento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Publicacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Evento.prototype.idEvento,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicacion, {
            title: 'NewPublicacionInEvento',
            exclude: ['idPublicacion'],
            optional: ['eventoId']
          }),
        },
      },
    }) publicacion: Omit<Publicacion, 'idPublicacion'>,
  ): Promise<Publicacion> {
    return this.eventoRepository.publicacion(id).create(publicacion);
  }

  @patch('/eventos/{id}/publicacion', {
    responses: {
      '200': {
        description: 'Evento.Publicacion PATCH success count',
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
    return this.eventoRepository.publicacion(id).patch(publicacion, where);
  }

  @del('/eventos/{id}/publicacion', {
    responses: {
      '200': {
        description: 'Evento.Publicacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Publicacion)) where?: Where<Publicacion>,
  ): Promise<Count> {
    return this.eventoRepository.publicacion(id).delete(where);
  }
}
