import {Model, model, property} from '@loopback/repository';

@model()
export class NotificacionEmail extends Model {
  @property({
    type: 'string',
    required: false,
  })
  to?: string;

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

  @property({
    type: 'string',
    required: false,
  })
  from?: string;

  constructor(data?: Partial<NotificacionEmail>) {
    super(data);
  }
}

export interface NotificacionEmailRelations {
  // describe navigational properties here
}

export type NotificacionEmailWithRelations = NotificacionEmail & NotificacionEmailRelations;
