import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Aficionado} from './aficionado.model';
import {Banda} from './banda.model';
import {MusicoProfesional} from './musico-profesional.model';
import {DenunciaXusario} from './denuncia-xusario.model';
import {DenunciaXPubli} from './denuncia-x-publi.model';
import {Mensaje} from './mensaje.model';
import {Notificacion} from './notificacion.model';
import {Comentario} from './comentario.model';

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

  @hasMany(() => DenunciaXusario)
  denunciaXusarios: DenunciaXusario[];

  @hasMany(() => DenunciaXPubli)
  denunciaXPublis: DenunciaXPubli[];

  @belongsTo(() => Mensaje)
  mensajeId: string;

  @belongsTo(() => Notificacion)
  notificacionId: string;

  @belongsTo(() => Comentario)
  comentarioId: string;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
