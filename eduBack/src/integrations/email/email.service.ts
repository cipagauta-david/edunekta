import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType?: string;
  }>;
}

/**
 * Servicio de integración para envío de emails
 */
@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: any; // Nodemailer transporter

  constructor(private configService: ConfigService) {
    // TODO: Configurar transporter de nodemailer
    // this.transporter = nodemailer.createTransporter({
    //   host: this.configService.get('SMTP_HOST'),
    //   port: this.configService.get('SMTP_PORT'),
    //   secure: this.configService.get('SMTP_SECURE'),
    //   auth: {
    //     user: this.configService.get('SMTP_USER'),
    //     pass: this.configService.get('SMTP_PASS'),
    //   },
    // });
  }

  /**
   * Enviar email
   * @param options - Opciones del email
   */
  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      this.logger.log(`Sending email to: ${options.to}`);
      
      // TODO: Implementar envío de email
      const mailOptions = {
        from: this.configService.get('SMTP_FROM'),
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments,
      };

      // await this.transporter.sendMail(mailOptions);
      
      this.logger.log('Email sent successfully');
    } catch (error) {
      this.logger.error('Error sending email:', error);
      throw error;
    }
  }

  /**
   * Enviar email de bienvenida
   * @param email - Email del usuario
   * @param name - Nombre del usuario
   */
  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const subject = 'Bienvenido a Edunekta';
    const html = `
      <h1>¡Bienvenido a Edunekta, ${name}!</h1>
      <p>Tu cuenta ha sido creada exitosamente.</p>
      <p>Ahora puedes acceder a la plataforma educativa.</p>
    `;

    await this.sendEmail({
      to: email,
      subject,
      html,
    });
  }

  /**
   * Enviar email de recuperación de contraseña
   * @param email - Email del usuario
   * @param resetToken - Token de recuperación
   */
  async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    const subject = 'Recuperación de contraseña - Edunekta';
    const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${resetToken}`;
    
    const html = `
      <h1>Recuperación de contraseña</h1>
      <p>Has solicitado recuperar tu contraseña.</p>
      <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
      <a href="${resetUrl}">Recuperar contraseña</a>
      <p>Este enlace expira en 1 hora.</p>
    `;

    await this.sendEmail({
      to: email,
      subject,
      html,
    });
  }
}

