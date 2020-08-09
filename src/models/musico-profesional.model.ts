import {belongsTo, Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {GrupoXMusicoP} from './grupo-x-musico-p.model';
import {Publicacion} from './publicacion.model';
import {Usuario} from './usuario.model';

@model()
export class MusicoProfesional extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idMusicoProfesional?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  generoMusica: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
    unique: true
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  genero: string;

  @property({
    type: 'string',
    required: false,
  })
  image?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  seguidores?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  seguidos?: string[];

  @hasOne(() => Usuario)
  usuario: Usuario;

  @hasMany(() => Publicacion)
  publicacions: Publicacion[];

  @belongsTo(() => GrupoXMusicoP)
  grupoXMusicoPId: string;

  constructor(data?: Partial<MusicoProfesional>) {
    super(data);
  }
}

export interface MusicoProfesionalRelations {
  // describe navigational properties here
}

export type MusicoProfesionalWithRelations = MusicoProfesional & MusicoProfesionalRelations;
