import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface SmsOptions {
  to: string;
  message: string;
}

/**
 * Servicio de integración para envío de SMS
 */
@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);
  private twilioClient: any; // Twilio client

  constructor(private configService: ConfigService) {
    // TODO: Inicializar cliente de Twilio
    // this.twilioClient = twilio(
    //   this.configService.get('TWILIO_ACCOUNT_SID'),
    //   this.configService.get('TWILIO_AUTH_TOKEN')
    // );
  }

  /**
   * Enviar SMS
   * @param options - Opciones del SMS
   */
  async sendSms(options: SmsOptions): Promise<void> {
    try {
      this.logger.log(`Sending SMS to: ${options.to}`);
      
      // TODO: Implementar envío de SMS
      // await this.twilioClient.messages.create({
      //   body: options.message,
      //   from: this.configService.get('TWILIO_PHONE_NUMBER'),
      //   to: options.to,
      // });
      
      this.logger.log('SMS sent successfully');
    } catch (error) {
      this.logger.error('Error sending SMS:', error);
      throw error;
    }
  }

  /**
   * Enviar código de verificación por SMS
   * @param phoneNumber - Número de teléfono
   * @param code - Código de verificación
   */
  async sendVerificationCode(phoneNumber: string, code: string): Promise<void> {
    const message = `Tu código de verificación para Edunekta es: ${code}. Este código expira en 10 minutos.`;
    
    await this.sendSms({
      to: phoneNumber,
      message,
    });
  }

  /**
   * Enviar notificación de calificación
   * @param phoneNumber - Número de teléfono del padre/tutor
   * @param studentName - Nombre del estudiante
   * @param subject - Materia
   * @param grade - Calificación
   */
  async sendGradeNotification(
    phoneNumber: string,
    studentName: string,
    subject: string,
    grade: number,
  ): Promise<void> {
    const message = `Edunekta: ${studentName} ha recibido una calificación de ${grade} en ${subject}.`;
    
    await this.sendSms({
      to: phoneNumber,
      message,
    });
  }
}

