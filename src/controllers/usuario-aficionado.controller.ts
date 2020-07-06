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
  Aficionado,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioAficionadoController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/aficionado', {
    responses: {
      '200': {
        description: 'Usuario has one Aficionado',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Aficionado),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Aficionado>,
  ): Promise<Aficionado> {
    return this.usuarioRepository.aficionado(id).get(filter);
  }

  @post('/usuarios/{id}/aficionado', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Aficionado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.idUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aficionado, {
            title: 'NewAficionadoInUsuario',
            exclude: ['idAficionado'],
            optional: ['usuarioId']
          }),
        },
      },
    }) aficionado: Omit<Aficionado, 'idAficionado'>,
  ): Promise<Aficionado> {
    return this.usuarioRepository.aficionado(id).create(aficionado);
  }

  @patch('/usuarios/{id}/aficionado', {
    responses: {
      '200': {
        description: 'Usuario.Aficionado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aficionado, {partial: true}),
        },
      },
    })
    aficionado: Partial<Aficionado>,
    @param.query.object('where', getWhereSchemaFor(Aficionado)) where?: Where<Aficionado>,
  ): Promise<Count> {
    return this.usuarioRepository.aficionado(id).patch(aficionado, where);
  }

  @del('/usuarios/{id}/aficionado', {
    responses: {
      '200': {
        description: 'Usuario.Aficionado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Aficionado)) where?: Where<Aficionado>,
  ): Promise<Count> {
    return this.usuarioRepository.aficionado(id).delete(where);
  }
}
