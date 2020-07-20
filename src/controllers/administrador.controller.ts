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
import {Administrador, SmsNotificacion} from '../models';
import {AdministradorRepository, UsuarioRepository} from '../repositories';
import {EncryptDecrypt} from '../servies/encrypt-decrypt.service';
import {NotificacionService} from '../servies/notificacion.service';

export class AdministradorController {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository,

    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) {}

  @post('/administradors', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Administrador)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {
            title: 'NewAdministrador',
            exclude: ['idAdministrador'],
          }),
        },
      },
    })
    administrador: Omit<Administrador, 'id'>,
  ): Promise<Administrador> {

    let adm = await this.administradorRepository.create(administrador);

    let aleatoreaCont = generate({
      length: LlaveContrasenas.LONGITUD,
      numbers: LlaveContrasenas.NUMBERS,
      lowercase: LlaveContrasenas.LOWERCASE,
      uppercase: LlaveContrasenas.UPPERCASE
    })

    let contrasena1 = new EncryptDecrypt(keys.MD5).Encrypt(aleatoreaCont);
    let contrasena2 = new EncryptDecrypt(keys.MD5).Encrypt(contrasena1);

    let u = {
      nombreUsuario: adm.correo,
      contrasena: contrasena2,
      rol: 'Administrador',
      administradorId: adm.idAdministrador
    };

    let user = await this.usuarioRepository.create(u);

    let notificacion = new SmsNotificacion({
      body: `Hola ${administrador.correo} Esta es tu cuenta de adminitrador tipo ${administrador.tipo}, su contraseña es: ${aleatoreaCont}`,
      to: administrador.celular
    });

    await new NotificacionService().SmsNotificacion(notificacion);
    user.contrasena = '';
    /**console.log(user)*/
    adm.usuario = user;
    return adm
  }

  @get('/administradors/count', {
    responses: {
      '200': {
        description: 'Administrador model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Administrador) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.administradorRepository.count(where);
  }

  @get('/administradors', {
    responses: {
      '200': {
        description: 'Array of Administrador model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Administrador, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Administrador) filter?: Filter<Administrador>,
  ): Promise<Administrador[]> {
    return this.administradorRepository.find(filter);
  }

  @patch('/administradors', {
    responses: {
      '200': {
        description: 'Administrador PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {partial: true}),
        },
      },
    })
    administrador: Administrador,
    @param.where(Administrador) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.administradorRepository.updateAll(administrador, where);
  }

  @get('/administradors/{id}', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Administrador, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Administrador, {exclude: 'where'}) filter?: FilterExcludingWhere<Administrador>
  ): Promise<Administrador> {
    return this.administradorRepository.findById(id, filter);
  }

  @patch('/administradors/{id}', {
    responses: {
      '204': {
        description: 'Administrador PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {partial: true}),
        },
      },
    })
    administrador: Administrador,
  ): Promise<void> {
    await this.administradorRepository.updateById(id, administrador);
  }

  @put('/administradors/{id}', {
    responses: {
      '204': {
        description: 'Administrador PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() administrador: Administrador,
  ): Promise<void> {
    let u = await this.usuarioRepository.findOne({where: {administradorId: administrador.idAdministrador}});
    if (u) {
      u.nombreUsuario = administrador.correo;
      await this.usuarioRepository.replaceById(u.idUsuario, u);
    }
    await this.administradorRepository.replaceById(id, administrador);
  }

  @del('/administradors/{id}', {
    responses: {
      '204': {
        description: 'Administrador DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.administradorRepository.deleteById(id);
  }
}
