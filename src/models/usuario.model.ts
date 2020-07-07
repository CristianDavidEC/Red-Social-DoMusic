import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Aficionado} from './aficionado.model';
import {Banda} from './banda.model';
import {MusicoProfesional} from './musico-profesional.model';

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

  @property({
    type: 'string',
    required: true,
  })
  rol: string;

  @belongsTo(() => Administrador)
  administradorId: string;

  @belongsTo(() => Aficionado)
  aficionadoId: string;

  @belongsTo(() => Banda)
  bandaId: string;

  @belongsTo(() => MusicoProfesional)
  musicoProfesionalId: string;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
