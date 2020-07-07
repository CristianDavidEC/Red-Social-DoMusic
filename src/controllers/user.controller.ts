// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
/**import {Credentials} from 'crypto';**/
import {UsuarioRepository} from '../repositories';
import {AuthService} from '../servies/auth.service';

// import {inject} from '@loopback/core';

class Credentials {
  nombreUsuario: string;
  contrasena: string;
}

export class UserController {
  authService: AuthService;
  constructor(
    @repository(UsuarioRepository)

    public usuarioRepository: UsuarioRepository


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

}
