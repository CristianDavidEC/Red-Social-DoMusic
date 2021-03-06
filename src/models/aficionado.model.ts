import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {GrupoXAficionado} from './grupo-x-aficionado.model';
import {Usuario} from './usuario.model';

@model()
export class Aficionado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idAficionado?: string;

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
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  genero: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  temasInteres: string[];

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

  @belongsTo(() => GrupoXAficionado)
  grupoXAficionadoId: string;

  constructor(data?: Partial<Aficionado>) {
    super(data);
  }
}

export interface AficionadoRelations {
  // describe navigational properties here
}

export type AficionadoWithRelations = Aficionado & AficionadoRelations;
