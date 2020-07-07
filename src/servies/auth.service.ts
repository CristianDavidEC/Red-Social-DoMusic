import {repository} from '@loopback/repository';
import {generate as generator} from 'generate-password';
import {LlaveContrasenas as llaveCont} from '../keys/llave-contraseña';
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
  /**
   *
   * @param nombreUsuario
   * @param contrasena
   */
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

  /**
   * Restablce la contraseña del usuario
   * @param nombreUsuario
   */
  async ReseteoContrasena(nombreUsuario: string): Promise<String | false> {
    let usuario = await this.usuarioRepository.findOne({where: {nombreUsuario: nombreUsuario}});

    if (usuario) {
      let contrasenaAleatoria = generator({
        length: llaveCont.LONGITUD,
        numbers: llaveCont.NUMBERS,
        lowercase: llaveCont.LOWERCASE,
        uppercase: llaveCont.UPPERCASE
      });

      let crypter = new EncryptDecrypt(keys.LOGIN_CRYPT_METHOD);
      let contrasena = crypter.Encrypt(crypter.Encrypt(contrasenaAleatoria))
      usuario.contrasena = contrasena;
      this.usuarioRepository.replaceById(usuario.idUsuario, usuario);
      return contrasenaAleatoria;
    }
    return false;
  }
  async VerifyToken(token: string) {
    try {
      let data = jwt.verify(token, keys.JWT_SECRET_KEY);
      return data;

    } catch (error) {
      return false;

    }
  }

}