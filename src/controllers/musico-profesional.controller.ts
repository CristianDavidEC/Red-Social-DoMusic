import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody
} from '@loopback/rest';
import {MusicoProfesional} from '../models';
import {MusicoProfesionalRepository, UsuarioRepository} from '../repositories';

export class MusicoProfesionalController {
  constructor(
    @repository(MusicoProfesionalRepository)
    public musicoProfesionalRepository: MusicoProfesionalRepository,

    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) {}

  @post('/musico-profesionals', {
    responses: {
      '200': {
        description: 'MusicoProfesional model instance',
        content: {'application/json': {schema: getModelSchemaRef(MusicoProfesional)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MusicoProfesional, {
            title: 'NewMusicoProfesional',
            exclude: ['idMusicoProfesional'],
          }),
        },
      },
    })
    musicoProfesional: Omit<MusicoProfesional, 'id'>,
  ): Promise<MusicoProfesional> {

    let mus = await this.musicoProfesionalRepository.create(musicoProfesional);

    let u = {
      nombreUsuario: mus.correo,
      contrasena: mus.correo,
      rol: 'Musico Profesional',
      musicoProfesionalId: mus.idMusicoProfesional
    };

    let user = await this.usuarioRepository.create(u);
    user.contrasena = '';
    /**console.log(user)*/
    mus.usuario = user;
    return mus
  }

  @get('/musico-profesionals/count', {
    responses: {
      '200': {
        description: 'MusicoProfesional model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(MusicoProfesional) where?: Where<MusicoProfesional>,
  ): Promise<Count> {
    return this.musicoProfesionalRepository.count(where);
  }

  @get('/musico-profesionals', {
    responses: {
      '200': {
        description: 'Array of MusicoProfesional model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(MusicoProfesional, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(MusicoProfesional) filter?: Filter<MusicoProfesional>,
  ): Promise<MusicoProfesional[]> {
    return this.musicoProfesionalRepository.find(filter);
  }

  @patch('/musico-profesionals', {
    responses: {
      '200': {
        description: 'MusicoProfesional PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MusicoProfesional, {partial: true}),
        },
      },
    })
    musicoProfesional: MusicoProfesional,
    @param.where(MusicoProfesional) where?: Where<MusicoProfesional>,
  ): Promise<Count> {
    return this.musicoProfesionalRepository.updateAll(musicoProfesional, where);
  }

  @get('/musico-profesionals/{id}', {
    responses: {
      '200': {
        description: 'MusicoProfesional model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MusicoProfesional, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MusicoProfesional, {exclude: 'where'}) filter?: FilterExcludingWhere<MusicoProfesional>
  ): Promise<MusicoProfesional> {
    return this.musicoProfesionalRepository.findById(id, filter);
  }

  @patch('/musico-profesionals/{id}', {
    responses: {
      '204': {
        description: 'MusicoProfesional PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MusicoProfesional, {partial: true}),
        },
      },
    })
    musicoProfesional: MusicoProfesional,
  ): Promise<void> {
    await this.musicoProfesionalRepository.updateById(id, musicoProfesional);
  }

  @put('/musico-profesionals/{id}', {
    responses: {
      '204': {
        description: 'MusicoProfesional PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() musicoProfesional: MusicoProfesional,
  ): Promise<void> {
    let u = await this.usuarioRepository.findOne({where: {musicoProfesionalId: musicoProfesional.idMusicoProfesional}});
    if (u) {
      u.nombreUsuario = musicoProfesional.correo;
      await this.usuarioRepository.replaceById(u.idUsuario, u);
    }
    await this.musicoProfesionalRepository.replaceById(id, musicoProfesional);
  }

  @del('/musico-profesionals/{id}', {
    responses: {
      '204': {
        description: 'MusicoProfesional DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.musicoProfesionalRepository.deleteById(id);
  }
}
