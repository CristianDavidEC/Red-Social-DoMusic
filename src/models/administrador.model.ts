import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Administrador extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idAdministrador?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
    unique: true
  })
  correo: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  constructor(data?: Partial<Administrador>) {
    super(data);
  }
}

export interface AdministradorRelations {
  // describe navigational properties here
}

export type AdministradorWithRelations = Administrador & AdministradorRelations;
