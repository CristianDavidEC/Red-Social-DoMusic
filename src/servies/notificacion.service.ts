import {NotificacionDatasource} from '../datasources/notificacion.datasource';
import {NotoficacionEmail, SmsNotificacion} from '../models';
const twilio = require('twilio');
const sgMail = require('@sendgrid/mail');


export class NotificacionService {

  async SmsNotificacion(notificacion: SmsNotificacion): Promise<boolean> {
    try {

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
    } catch (error) {
      return false;
    }
  }

  async NotificacionEmail(notificacion: NotoficacionEmail): Promise<boolean> {
    try {
      sgMail.setApiKey(NotificacionDatasource.SENDGRID_API_KEY);
      const msg = {
        to: notificacion.to,
        from: NotificacionDatasource.SENDGRID_FROM,
        subject: notificacion.subject,
        text: notificacion.textBody,
        html: notificacion.htmlBody,
      };
      await sgMail.send(msg).then((data: any) => {
        console.log(data);
        return true;
      }, function (error: any) {
        console.log(error);
        return false;
      });
      return true;
    } catch (err) {
      return false
    }
  }
}
