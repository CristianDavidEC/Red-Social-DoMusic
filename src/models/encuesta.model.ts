import {Entity, model, property} from '@loopback/repository';

@model()
export class Encuesta extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idEncuesta?: string;

  @property({
    type: 'string',
    required: true,
  })
  pregunta: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  respuestas: string[];

  @property({
    type: 'string',
  })
  respuestaUsuario?: string;


  constructor(data?: Partial<Encuesta>) {
    super(data);
  }
}

export interface EncuestaRelations {
  // describe navigational properties here
}

export type EncuestaWithRelations = Encuesta & EncuestaRelations;
