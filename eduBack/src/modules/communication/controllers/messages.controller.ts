import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { CreateMessageDto, UpdateMessageDto, MessageQueryDto } from '../dto/message.dto';
import { JwtAuthGuard } from '../../../core/auth/jwt-auth.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

/**
 * Controlador para gestión de mensajes y conversaciones
 */
@Controller('api/v1/communication/messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  /**
   * Enviar nuevo mensaje
   */
  @Post()
  create(@Body() createMessageDto: CreateMessageDto, @CurrentUser() user: any) {
    return this.messagesService.create(createMessageDto, user.id);
  }

  /**
   * Obtener conversaciones del usuario
   */
  @Get('conversations')
  getConversations(@CurrentUser() user: any, @Query() query: MessageQueryDto) {
    return this.messagesService.getConversations(user.id, query);
  }

  /**
   * Obtener mensajes de una conversación
   */
  @Get('conversations/:conversationId')
  getConversationMessages(
    @Param('conversationId') conversationId: string,
    @CurrentUser() user: any,
    @Query() query: MessageQueryDto,
  ) {
    return this.messagesService.getConversationMessages(+conversationId, user.id, query);
  }

  /**
   * Marcar mensaje como leído
   */
  @Patch(':id/read')
  markAsRead(@Param('id') id: string, @CurrentUser() user: any) {
    return this.messagesService.markAsRead(+id, user.id);
  }

  /**
   * Marcar conversación como leída
   */
  @Patch('conversations/:conversationId/read')
  markConversationAsRead(
    @Param('conversationId') conversationId: string,
    @CurrentUser() user: any,
  ) {
    return this.messagesService.markConversationAsRead(+conversationId, user.id);
  }

  /**
   * Eliminar mensaje
   */
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.messagesService.remove(+id, user.id);
  }

  /**
   * Buscar mensajes
   */
  @Get('search')
  search(@Query() query: MessageQueryDto, @CurrentUser() user: any) {
    return this.messagesService.search(query, user.id);
  }

  /**
   * Obtener mensajes no leídos
   */
  @Get('unread')
  getUnreadMessages(@CurrentUser() user: any) {
    return this.messagesService.getUnreadMessages(user.id);
  }

  /**
   * Crear nueva conversación
   */
  @Post('conversations')
  createConversation(@Body() createConversationDto: any, @CurrentUser() user: any) {
    return this.messagesService.createConversation(createConversationDto, user.id);
  }

  /**
   * Agregar participante a conversación
   */
  @Post('conversations/:conversationId/participants')
  addParticipant(
    @Param('conversationId') conversationId: string,
    @Body() addParticipantDto: any,
    @CurrentUser() user: any,
  ) {
    return this.messagesService.addParticipant(+conversationId, addParticipantDto, user.id);
  }

  /**
   * Salir de conversación
   */
  @Delete('conversations/:conversationId/leave')
  leaveConversation(
    @Param('conversationId') conversationId: string,
    @CurrentUser() user: any,
  ) {
    return this.messagesService.leaveConversation(+conversationId, user.id);
  }
}

