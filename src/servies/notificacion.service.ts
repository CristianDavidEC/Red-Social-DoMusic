import { SmsNotificacion } from '../models';
import { NotificacionDatasource } from '../datasources/notificacion.datasource';
const twilio =require('twilio'); 

export class NotificacionService{

    async SmsNotificacion(notificacion: SmsNotificacion):Promise<boolean>{
      try{

const accountSid = NotificacionDatasource.TWILIO_SID;
const authToken = NotificacionDatasource.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

await client.messages
    .create({
      body: notificacion.body, 
      from: NotificacionDatasource.TWILIO_FROM, 
      to: notificacion.to
    })
      .then((message: any) => {
        console.log(message)
      });
      return true;
      }catch(error){
      return false;    
      }
    }
}