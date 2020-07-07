import {Entity, hasOne, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Banda} from './banda.model';

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
    type: 'date',
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
    required: true,
  })
  fotoPerfil: string;

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

  @belongsTo(() => Banda)
  bandaId: string;

  constructor(data?: Partial<MusicoProfesional>) {
    super(data);
  }
}

export interface MusicoProfesionalRelations {
  // describe navigational properties here
}

export type MusicoProfesionalWithRelations = MusicoProfesional & MusicoProfesionalRelations;
