import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

export interface UserCreatedEvent {
  userId: number;
  email: string;
  name: string;
  roles: string[];
}

export interface UserUpdatedEvent {
  userId: number;
  changes: Record<string, any>;
}

export interface UserDeletedEvent {
  userId: number;
  email: string;
}

/**
 * Publisher de eventos relacionados con usuarios
 */
@Injectable()
export class UserPublisher {
  constructor(private eventEmitter: EventEmitter2) {}

  /**
   * Emitir evento de usuario creado
   * @param event - Datos del evento
   */
  userCreated(event: UserCreatedEvent): void {
    this.eventEmitter.emit('user.created', event);
  }

  /**
   * Emitir evento de usuario actualizado
   * @param event - Datos del evento
   */
  userUpdated(event: UserUpdatedEvent): void {
    this.eventEmitter.emit('user.updated', event);
  }

  /**
   * Emitir evento de usuario eliminado
   * @param event - Datos del evento
   */
  userDeleted(event: UserDeletedEvent): void {
    this.eventEmitter.emit('user.deleted', event);
  }

  /**
   * Emitir evento de login de usuario
   * @param userId - ID del usuario
   * @param ip - IP del usuario
   */
  userLoggedIn(userId: number, ip: string): void {
    this.eventEmitter.emit('user.logged-in', { userId, ip, timestamp: new Date() });
  }

  /**
   * Emitir evento de logout de usuario
   * @param userId - ID del usuario
   */
  userLoggedOut(userId: number): void {
    this.eventEmitter.emit('user.logged-out', { userId, timestamp: new Date() });
  }
}

