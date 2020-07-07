import {
  AuthenticationBindings,
  AuthenticationMetadata
} from '@loopback/authentication';
import {inject, Provider, ValueOrPromise} from '@loopback/context';
import {repository} from '@loopback/repository';
import {Strategy} from 'passport';
import {BasicStrategy} from 'passport-http';
import {Strategy as BearerStrategy} from 'passport-http-bearer';
import {UsuarioRepository} from '../repositories';
import {AuthService} from '../servies/auth.service';


export class MyAuthStrategyProvider implements Provider<Strategy | undefined> {
  authService: AuthService;

  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
  ) {
    this.authService = new AuthService(usuarioRepository)
  }

  value(): ValueOrPromise<Strategy | undefined> {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;
    switch (name) {
      case 'BasicStrategy':
        return new BasicStrategy(this.VerifyUser.bind(this));
      case 'TokenStrategy':
        return new BearerStrategy(this.VerifyToken.bind(this));
      case 'TokenAdminStrategy':
        return new BearerStrategy(this.VerifyAdmiToken.bind(this));
      case 'TokenAficionadoStrategy':
        return new BearerStrategy(this.VerifyAficionadoToken.bind(this));
      case 'TokenBandaStrategy':
        return new BearerStrategy(this.VerifyBandaToken.bind(this));
      case 'TokenMusProfesionalStrategy':
        return new BearerStrategy(this.VerifyMusProfesionalToken.bind(this));
      default:
        return Promise.reject(`The strategy ${name} is not available.`);
        break;

    }
  }

  VerifyUser(
    username: string,
    password: string,
    cb: (err: Error | null, user?: Object | false) => void,
  ) {

    let user = this.authService.Identify(username, password);
    return cb(null, user);
  }

  VerifyToken(
    token: string,

    cb: (err: Error | null, user?: Object | false) => void,
  ) {
    this.authService.VerifyToken(token).then(verification => {
      if (verification) {
        return cb(null, verification)
      }
      return cb(null, false);
    });

  }

  VerifyAficionadoToken(
    token: string,

    cb: (err: Error | null, user?: Object | false) => void,
  ) {
    this.authService.VerifyToken(token).then(data => {
      if (data && data.rol == 'Aficionado') {
        return cb(null, data)
      }
      return cb(null, false);
    });

  }

  VerifyAdmiToken(
    token: string,

    cb: (err: Error | null, user?: Object | false) => void,
  ) {
    this.authService.VerifyToken(token).then(data => {
      if (data && data.rol == 'Administrador') {
        return cb(null, data)
      }
      return cb(null, false);
    });

  }

  VerifyBandaToken(
    token: string,

    cb: (err: Error | null, user?: Object | false) => void,
  ) {
    this.authService.VerifyToken(token).then(data => {
      if (data && data.rol == 'Banda') {
        return cb(null, data)
      }
      return cb(null, false);
    });

  }

  VerifyMusProfesionalToken(
    token: string,

    cb: (err: Error | null, user?: Object | false) => void,
  ) {
    this.authService.VerifyToken(token).then(data => {
      if (data && data.rol == 'Musico Profesional') {
        return cb(null, data)
      }
      return cb(null, false);
    });

  }
}
