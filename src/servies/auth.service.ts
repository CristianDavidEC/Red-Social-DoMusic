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

  async VerificarUsuarioCambioContrasena(id: string, contrasena: string): Promise<Usuario | false> {
    let usuario = await this.usuarioRepository.findById(id);
    if (usuario) {
      let cryptPass = new EncryptDecrypt(ServiceKeys.LOGIN_CRYPT_METHOD).Encrypt(contrasena);
      if (usuario.contrasena == cryptPass) {
        return usuario;
      }
    }
    return false;
  }

  /**
   *
   * @param id Usuario
   * @param contrasena nueva contraseña
   */
  async CambioContrasena(id: string, contrasena: string): Promise<boolean> {
    let usuario = await this.usuarioRepository.findById(id);
    if (usuario) {
      let cryptPass = new EncryptDecrypt(ServiceKeys.LOGIN_CRYPT_METHOD).Encrypt(contrasena);
      usuario.contrasena = cryptPass;
      await this.usuarioRepository.updateById(id, usuario);
      return true;

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
    //Busca un un usuario con su username
    let usuario = await this.usuarioRepository.findOne({where: {nombreUsuario: nombreUsuario}});
    //console.log(usuario, "Reseteo conraseña auto services")
    //Genera una nueva clave
    if (usuario) {
      let contrasenaAleatoria = generator({
        length: llaveCont.LONGITUD,
        numbers: llaveCont.NUMBERS,
        lowercase: llaveCont.LOWERCASE,
        uppercase: llaveCont.UPPERCASE
      });

      //Encripta la contraseña
      let crypter = new EncryptDecrypt(keys.LOGIN_CRYPT_METHOD);
      let contrasena = crypter.Encrypt(crypter.Encrypt(contrasenaAleatoria))
      //Asigna la nueva contraseña al usuario
      usuario.contrasena = contrasena;
      this.usuarioRepository.replaceById(usuario.idUsuario, usuario);
      return contrasenaAleatoria;
    }
    return false;
  }
  async VerifyToken(token: string) {
    try {
      let data = jwt.verify(token, keys.JWT_SECRET_KEY).data;
      return data;

    } catch (error) {
      return false;

    }
  }

}
