import {Model, model, property} from '@loopback/repository';

@model()
export class NotoficacionEmail extends Model {
  @property({
    type: 'string',
    required: true,
  })
  to: string;

  @property({
    type: 'string',
    required: true,
  })
  subject: string;

  @property({
    type: 'string',
    required: true,
  })
  htmlBody: string;

  @property({
    type: 'string',
    required: true,
  })
  textBody: string;


  constructor(data?: Partial<NotoficacionEmail>) {
    super(data);
  }
}

export interface NotoficacionEmailRelations {
  // describe navigational properties here
}

export type NotoficacionEmailWithRelations = NotoficacionEmail & NotoficacionEmailRelations;
