import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent, UserUpdatedEvent, UserDeletedEvent } from '../publishers/user.publisher';

/**
 * Listener de eventos relacionados con usuarios
 */
@Injectable()
export class UserListener {
  private readonly logger = new Logger(UserListener.name);

  /**
   * Manejar evento de usuario creado
   * @param event - Datos del evento
   */
  @OnEvent('user.created')
  async handleUserCreated(event: UserCreatedEvent): Promise<void> {
    this.logger.log(`User created: ${event.email} (ID: ${event.userId})`);
    
    // TODO: Enviar email de bienvenida
    // TODO: Crear perfil por defecto
    // TODO: Asignar permisos iniciales
    
    try {
      // Aquí se pueden agregar acciones como:
      // - Enviar email de bienvenida
      // - Crear configuraciones por defecto
      // - Registrar en analytics
      
      this.logger.log(`Welcome actions completed for user: ${event.userId}`);
    } catch (error) {
      this.logger.error(`Error handling user created event: ${error.message}`);
    }
  }

  /**
   * Manejar evento de usuario actualizado
   * @param event - Datos del evento
   */
  @OnEvent('user.updated')
  async handleUserUpdated(event: UserUpdatedEvent): Promise<void> {
    this.logger.log(`User updated: ${event.userId}`);
    
    try {
      // Aquí se pueden agregar acciones como:
      // - Invalidar cache
      // - Notificar cambios importantes
      // - Actualizar índices de búsqueda
      
      this.logger.log(`Update actions completed for user: ${event.userId}`);
    } catch (error) {
      this.logger.error(`Error handling user updated event: ${error.message}`);
    }
  }

  /**
   * Manejar evento de usuario eliminado
   * @param event - Datos del evento
   */
  @OnEvent('user.deleted')
  async handleUserDeleted(event: UserDeletedEvent): Promise<void> {
    this.logger.log(`User deleted: ${event.email} (ID: ${event.userId})`);
    
    try {
      // Aquí se pueden agregar acciones como:
      // - Limpiar datos relacionados
      // - Enviar notificación de despedida
      // - Archivar información importante
      
      this.logger.log(`Cleanup actions completed for user: ${event.userId}`);
    } catch (error) {
      this.logger.error(`Error handling user deleted event: ${error.message}`);
    }
  }

  /**
   * Manejar evento de login de usuario
   * @param event - Datos del evento
   */
  @OnEvent('user.logged-in')
  async handleUserLoggedIn(event: any): Promise<void> {
    this.logger.log(`User logged in: ${event.userId} from IP: ${event.ip}`);
    
    try {
      // Aquí se pueden agregar acciones como:
      // - Registrar actividad
      // - Verificar ubicación sospechosa
      // - Actualizar último acceso
      
    } catch (error) {
      this.logger.error(`Error handling user logged in event: ${error.message}`);
    }
  }

  /**
   * Manejar evento de logout de usuario
   * @param event - Datos del evento
   */
  @OnEvent('user.logged-out')
  async handleUserLoggedOut(event: any): Promise<void> {
    this.logger.log(`User logged out: ${event.userId}`);
    
    try {
      // Aquí se pueden agregar acciones como:
      // - Limpiar sesiones activas
      // - Registrar duración de sesión
      
    } catch (error) {
      this.logger.error(`Error handling user logged out event: ${error.message}`);
    }
  }
}

