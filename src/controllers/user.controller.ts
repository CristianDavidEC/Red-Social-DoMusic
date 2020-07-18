// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {NotificacionEmail, SmsNotificacion} from '../models';
/**import {Credentials} from 'crypto';**/
import {AficionadoRepository, UsuarioRepository} from '../repositories';
import {AuthService} from '../servies/auth.service';
import {NotificacionService} from '../servies/notificacion.service';

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
      let aficionado = await this.aficionadoRepository.findOne({where: {correo: recuperaDatosContrasena.nombreUsuario}})
      switch (recuperaDatosContrasena.tipo) {
        case 1:
          if (aficionado) {
            let notificacion = new SmsNotificacion({
              body: `su nueva contraseña es: ${contrasenaAleatoria}`,
              to: aficionado.celular
            });
            console.log(notificacion)
            let sms = await new NotificacionService().SmsNotificacion(notificacion);
            if (sms) {
              console.log("el mensaje fue enviado");
              return true;
            }
            throw new HttpErrors["400"](`el número telefónico no fue encontrado ${aficionado.celular}`);

          }
          throw new HttpErrors[400]("el usuario no fue encontrado");
          break;
        case 2:
          //Envio de Email

          if (aficionado) {
            let notificacion = new NotificacionEmail({
              textBody: `su nueva contraseña es: ${contrasenaAleatoria}`,
              htmlBody: `su nueva contraseña es: ${contrasenaAleatoria}`,
              to: aficionado.correo,
              subject: 'Nueva Contraseña'

            });
            let email = await new NotificacionService().NotificacionEmail(notificacion);
            if (email) {
              console.log("el mensaje fue enviado");
              return true;
            }
            throw new HttpErrors["400"]("El Email fue enviado");

          }
          throw new HttpErrors[400]("El usuario no fue encontrado");
          break;

        default:
          throw new HttpErrors[400]("Esta notoficacion no es de un tipo soportado");
          break;
      }
    }
    throw new HttpErrors[400]("El Usuario no fue encontrado");

  }

}
