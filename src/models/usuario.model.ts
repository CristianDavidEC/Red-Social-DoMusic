import {Entity, model, property, hasOne} from '@loopback/repository';
import {Aficionado} from './aficionado.model';
import {MusicoProfesional} from './musico-profesional.model';
import {Banda} from './banda.model';
import {Administrador} from './administrador.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idUsuario?: string;

  @property({
    type: 'string',
    required: true,
    unique: true
  })
  nombreUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasena: string;

  @hasOne(() => Aficionado)
  aficionado: Aficionado;

  @hasOne(() => MusicoProfesional)
  musicoProfesional: MusicoProfesional;

  @hasOne(() => Banda)
  banda: Banda;

  @hasOne(() => Administrador)
  administrador: Administrador;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
