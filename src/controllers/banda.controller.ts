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
import {generate} from 'generate-password';
import {LlaveContrasenas} from '../keys/llave-contraseña';
import {ServiceKeys as keys} from '../keys/service-keys';
import {Banda, SmsNotificacion} from '../models';
import {BandaRepository, UsuarioRepository} from '../repositories';
import {EncryptDecrypt} from '../servies/encrypt-decrypt.service';
import {NotificacionService} from '../servies/notificacion.service';

export class BandaController {
  constructor(
    @repository(BandaRepository)
    public bandaRepository: BandaRepository,

    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) {}

  @post('/bandas', {
    responses: {
      '200': {
        description: 'Banda model instance',
        content: {'application/json': {schema: getModelSchemaRef(Banda)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Banda, {
            title: 'NewBanda',
            exclude: ['idBanda'],
          }),
        },
      },
    })
    banda: Omit<Banda, 'id'>,
  ): Promise<Banda> {

    console.log(banda)
    let ban = await this.bandaRepository.create(banda);

    let aleatoreaCont = generate({
      length: LlaveContrasenas.LONGITUD,
      numbers: LlaveContrasenas.NUMBERS,
      lowercase: LlaveContrasenas.LOWERCASE,
      uppercase: LlaveContrasenas.UPPERCASE
    })

    let contrasena1 = new EncryptDecrypt(keys.MD5).Encrypt(aleatoreaCont);
    let contrasena2 = new EncryptDecrypt(keys.MD5).Encrypt(contrasena1);

    let u = {
      nombreUsuario: ban.correo,
      contrasena: contrasena2,
      rol: 'Banda',
      bandaId: ban.idBanda
    };

    console.log(u)

    let user = await this.usuarioRepository.create(u);
    let notificacion = new SmsNotificacion({
      body: `Hola ${banda.nombre} has creado una cuenta en DoMusic Como Musico, con este numero de Telefono, su contraseña es: ${aleatoreaCont}`,
      to: banda.celular
    });

    await new NotificacionService().SmsNotificacion(notificacion);
    user.contrasena = '';
    /**console.log(user)*/
    ban.usuario = user;
    return ban
  }

  @get('/bandas/count', {
    responses: {
      '200': {
        description: 'Banda model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Banda) where?: Where<Banda>,
  ): Promise<Count> {
    return this.bandaRepository.count(where);
  }

  @get('/bandas', {
    responses: {
      '200': {
        description: 'Array of Banda model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Banda, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Banda) filter?: Filter<Banda>,
  ): Promise<Banda[]> {
    return this.bandaRepository.find(filter);
  }

  @patch('/bandas', {
    responses: {
      '200': {
        description: 'Banda PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Banda, {partial: true}),
        },
      },
    })
    banda: Banda,
    @param.where(Banda) where?: Where<Banda>,
  ): Promise<Count> {
    return this.bandaRepository.updateAll(banda, where);
  }

  @get('/bandas/{id}', {
    responses: {
      '200': {
        description: 'Banda model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Banda, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Banda, {exclude: 'where'}) filter?: FilterExcludingWhere<Banda>
  ): Promise<Banda> {
    return this.bandaRepository.findById(id, filter);
  }

  @patch('/bandas/{id}', {
    responses: {
      '204': {
        description: 'Banda PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Banda, {partial: true}),
        },
      },
    })
    banda: Banda,
  ): Promise<void> {
    await this.bandaRepository.updateById(id, banda);
  }

  @put('/bandas/{id}', {
    responses: {
      '204': {
        description: 'Banda PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() banda: Banda,
  ): Promise<void> {
    let u = await this.usuarioRepository.findOne({where: {bandaId: banda.idBanda}});
    if (u) {
      u.nombreUsuario = banda.correo;
      await this.usuarioRepository.replaceById(u.idUsuario, u);
    }
    await this.bandaRepository.replaceById(id, banda);
  }

  @del('/bandas/{id}', {
    responses: {
      '204': {
        description: 'Banda DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.bandaRepository.deleteById(id);
  }
}
