import {repository} from '@loopback/repository';
import {ServiceKeys as keys, ServiceKeys} from '../keys/service-keys';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {EncryptDecrypt} from './encrypt-decrypt.service';
const jwt = require("jsonwebtoken");

export class AuthService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
  ) {

  }
  async Identify(nombreUsuario: string, contrasena: string): Promise<Usuario | false> {
    let usuario = await this.usuarioRepository.findOne({where: {nombreUsuario: nombreUsuario}});
    if (usuario) {
      let cryptPass = new EncryptDecrypt(ServiceKeys.LOGIN_CRYPT_METHOD).Encrypt(contrasena);
      if (usuario.contrasena == cryptPass) {
        return usuario;
      }
    }
    return false;
  }
  async GenerateToken(usuario: Usuario) {
    usuario.contrasena = '';
    let token = jwt.sign({
      exp: keys.TOKEN_EXPIRATION_TIME,
      data: {
        _id: usuario.idUsuario,
        nombreUsuario: usuario.nombreUsuario,
        rol: usuario.rol
      }
    },
      keys.JWT_SECRET_KEY);
    return token;
  }
}
