// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
/**import {Credentials} from 'crypto';**/
import {UsuarioRepository, AficionadoRepository} from '../repositories';
import {AuthService} from '../servies/auth.service';
import { SmsNotificacion, Aficionado } from '../models';
import { NotificacionService } from '../servies/notificacion.service';

// import {inject} from '@loopback/core';

class Credentials {
  nombreUsuario: string;
  contrasena: string;
}

class RecuperaDatosContrasena {
  nombreUsuario: string;
  tipo: number;
}

export class UserController {
  authService: AuthService;
  constructor(
    @repository(UsuarioRepository)

    public usuarioRepository: UsuarioRepository,
    
    @repository(AficionadoRepository)
    public aficionadoRepository: AficionadoRepository

  ) {
    this.authService = new AuthService(this.usuarioRepository);
  }
  @post('/login', {
    responses: {
      '200': {
        description: 'login por usuario'
      }
    }
  })

  async login(
    @requestBody() credentials: Credentials
  ): Promise<object> {
    let usuario = await this.authService.Identify(credentials.nombreUsuario, credentials.contrasena);
    if (usuario) {
      let tk = await this.authService.GenerateToken(usuario);
      return {
        data: usuario,
        token: tk
      }
    }
    else {
      throw new HttpErrors[401]("usuario o contraseña inválida");
    }
  }

  @post('/recuperar-contrasena', {
    responses: {
      '200': {
        description: 'login por usuario'
      }
    }
  })

  async rescuperar(
    @requestBody() recuperaDatosContrasena: RecuperaDatosContrasena
  ): Promise<boolean> {
    let contrasenaAleatoria = await this.authService.ReseteoContrasena(recuperaDatosContrasena.nombreUsuario)
    if (contrasenaAleatoria) {
      //Envia el sms o correo de la nueva contraseña
      // 1. sms
      // 2. E-mail

      switch (recuperaDatosContrasena.tipo) {
        case 1:
          let aficionado = await this.aficionadoRepository.findOne({where: {correo: recuperaDatosContrasena.nombreUsuario }})
          if (aficionado){
          let notificacion = new SmsNotificacion({
           body: `su nueva contraseña es: ${contrasenaAleatoria}`,
           to: aficionado.celular  
          });
          let sms = await new NotificacionService().SmsNotificacion(notificacion);
          if(sms){
            console.log("el mensaje fue enviado");
            return true;
          }
          throw new HttpErrors["400"]("el numero telefonico no fue encontrado");
          
        }
        throw new HttpErrors[400]("el usuario no fue encontrado");
          break;
        case 2:
          //Envio de Email
          console.log('Enviando E-mail' + contrasenaAleatoria)
          return true;
          break;

        default:
          throw new HttpErrors[400]("Esta notoficacion no es de un tipo soportado");
          break;
      }
    }
    throw new HttpErrors[400]("El Usuario no fue encontrado");

  }

}
