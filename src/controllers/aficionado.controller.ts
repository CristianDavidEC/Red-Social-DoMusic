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
import {Aficionado, SmsNotificacion} from '../models';
import {AficionadoRepository, UsuarioRepository} from '../repositories';
import {EncryptDecrypt} from '../servies/encrypt-decrypt.service';
import {NotificacionService} from '../servies/notificacion.service';


export class AficionadoController {
  constructor(
    @repository(AficionadoRepository)
    public aficionadoRepository: AficionadoRepository,

    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) {}


  @post('/aficionados', {
    responses: {
      '200': {
        description: 'Aficionado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Aficionado)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aficionado, {
            title: 'NewAficionado',
            exclude: ['idAficionado'],
          }),
        },
      },
    })
    aficionado: Omit<Aficionado, 'id'>,
  ): Promise<Aficionado> {

    let fan = await this.aficionadoRepository.create(aficionado);
    //Genera contraseña aleatoria con el patron definido de generate
    let aleatoreaCont = generate({
      length: LlaveContrasenas.LONGITUD,
      numbers: LlaveContrasenas.NUMBERS,
      lowercase: LlaveContrasenas.LOWERCASE,
      uppercase: LlaveContrasenas.UPPERCASE
    })
    //Encrypta la contraseña
    let contrasena1 = new EncryptDecrypt(keys.MD5).Encrypt(aleatoreaCont);
    let contrasena2 = new EncryptDecrypt(keys.MD5).Encrypt(contrasena1);
    //Crea el json para la notivicacion
    let u = {
      nombreUsuario: fan.correo,
      contrasena: contrasena2,
      rol: 'Aficionado',
      aficionadoId: fan.idAficionado
    };
    //Crea el Usuario
    let user = await this.usuarioRepository.create(u);

    //Define la notificaion a enviar
    let notificacion = new SmsNotificacion({
      body: `Hola ${aficionado.nombre} has creado una cuenta en DoMusic como aficionado, con este numero de Telefono, su contraseña es: ${aleatoreaCont}`,
      to: aficionado.celular
    });

    //Envia al notificacion
    await new NotificacionService().SmsNotificacion(notificacion);
    user.contrasena = '';
    fan.usuario = user;
    return fan
  }

  @get('/aficionados/count', {
    responses: {
      '200': {
        description: 'Aficionado model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Aficionado) where?: Where<Aficionado>,
  ): Promise<Count> {
    return this.aficionadoRepository.count(where);
  }

  @get('/aficionados', {
    responses: {
      '200': {
        description: 'Array of Aficionado model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Aficionado, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Aficionado) filter?: Filter<Aficionado>,
  ): Promise<Aficionado[]> {
    return this.aficionadoRepository.find(filter);
  }

  @patch('/aficionados', {
    responses: {
      '200': {
        description: 'Aficionado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aficionado, {partial: true}),
        },
      },
    })
    aficionado: Aficionado,
    @param.where(Aficionado) where?: Where<Aficionado>,
  ): Promise<Count> {
    return this.aficionadoRepository.updateAll(aficionado, where);
  }

  @get('/aficionados/{id}', {
    responses: {
      '200': {
        description: 'Aficionado model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Aficionado, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Aficionado, {exclude: 'where'}) filter?: FilterExcludingWhere<Aficionado>
  ): Promise<Aficionado> {
    return this.aficionadoRepository.findById(id, filter);
  }

  @patch('/aficionados/{id}', {
    responses: {
      '204': {
        description: 'Aficionado PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aficionado, {partial: true}),
        },
      },
    })
    aficionado: Aficionado,
  ): Promise<void> {
    await this.aficionadoRepository.updateById(id, aficionado);
  }

  @put('/aficionados/{id}', {
    responses: {
      '204': {
        description: 'Aficionado PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() aficionado: Aficionado,
  ): Promise<void> {
    let u = await this.usuarioRepository.findOne({where: {aficionadoId: aficionado.idAficionado}});
    if (u) {
      u.nombreUsuario = aficionado.correo;
      await this.usuarioRepository.replaceById(u.idUsuario, u);
    }
    await this.aficionadoRepository.replaceById(id, aficionado);
  }

  @del('/aficionados/{id}', {
    responses: {
      '204': {
        description: 'Aficionado DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.aficionadoRepository.deleteById(id);
  }
}
