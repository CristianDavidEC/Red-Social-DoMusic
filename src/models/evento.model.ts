import {Entity, model, property} from '@loopback/repository';

@model()
export class Evento extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  lugar: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idEvento?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaEvento: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;


  constructor(data?: Partial<Evento>) {
    super(data);
  }
}

export interface EventoRelations {
  // describe navigational properties here
}

export type EventoWithRelations = Evento & EventoRelations;
