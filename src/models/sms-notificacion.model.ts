import {Model, model, property} from '@loopback/repository';

@model()
export class SmsNotificacion extends Model {
  @property({
    type: 'string',
    required: true,
  })
  body: string;

  @property({
    type: 'string',
    required: true,
  })
  to: string;


  constructor(data?: Partial<SmsNotificacion>) {
    super(data);
  }
}

export interface SmsNotificacionRelations {
  // describe navigational properties here
}

export type SmsNotificacionWithRelations = SmsNotificacion & SmsNotificacionRelations;
