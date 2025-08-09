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
import { BillingService } from '../services/billing.service';
import { CreateInvoiceDto, UpdateInvoiceDto, BillingQueryDto } from '../dto/billing.dto';
import { JwtAuthGuard } from '../../../core/auth/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

/**
 * Controlador para gestión de facturación y pagos
 */
@Controller('api/v1/financial/billing')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  /**
   * Crear nueva factura
   */
  @Post('invoices')
  @Roles('admin', 'financial')
  createInvoice(@Body() createInvoiceDto: CreateInvoiceDto, @CurrentUser() user: any) {
    return this.billingService.createInvoice(createInvoiceDto, user.id);
  }

  /**
   * Obtener todas las facturas
   */
  @Get('invoices')
  @Roles('admin', 'financial')
  getAllInvoices(@Query() query: BillingQueryDto) {
    return this.billingService.getAllInvoices(query);
  }

  /**
   * Obtener facturas del usuario actual
   */
  @Get('my-invoices')
  @Roles('student', 'parent')
  getMyInvoices(@CurrentUser() user: any, @Query() query: BillingQueryDto) {
    return this.billingService.getUserInvoices(user.id, query);
  }

  /**
   * Obtener factura por ID
   */
  @Get('invoices/:id')
  getInvoice(@Param('id') id: string, @CurrentUser() user: any) {
    return this.billingService.getInvoice(+id, user.id);
  }

  /**
   * Actualizar factura
   */
  @Patch('invoices/:id')
  @Roles('admin', 'financial')
  updateInvoice(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
    @CurrentUser() user: any,
  ) {
    return this.billingService.updateInvoice(+id, updateInvoiceDto, user.id);
  }

  /**
   * Procesar pago de factura
   */
  @Post('invoices/:id/pay')
  @Roles('student', 'parent', 'admin')
  processPayment(
    @Param('id') id: string,
    @Body() paymentDto: any,
    @CurrentUser() user: any,
  ) {
    return this.billingService.processPayment(+id, paymentDto, user.id);
  }

  /**
   * Generar reporte de facturación
   */
  @Get('reports/billing')
  @Roles('admin', 'financial')
  getBillingReport(@Query() query: any) {
    return this.billingService.getBillingReport(query);
  }

  /**
   * Obtener estadísticas de pagos
   */
  @Get('stats/payments')
  @Roles('admin', 'financial')
  getPaymentStats(@Query() query: any) {
    return this.billingService.getPaymentStats(query);
  }

  /**
   * Enviar recordatorio de pago
   */
  @Post('invoices/:id/reminder')
  @Roles('admin', 'financial')
  sendPaymentReminder(@Param('id') id: string, @CurrentUser() user: any) {
    return this.billingService.sendPaymentReminder(+id, user.id);
  }

  /**
   * Generar factura masiva
   */
  @Post('bulk-invoice')
  @Roles('admin', 'financial')
  createBulkInvoices(@Body() bulkInvoiceDto: any, @CurrentUser() user: any) {
    return this.billingService.createBulkInvoices(bulkInvoiceDto, user.id);
  }

  /**
   * Obtener métodos de pago disponibles
   */
  @Get('payment-methods')
  getPaymentMethods() {
    return this.billingService.getPaymentMethods();
  }

  /**
   * Aplicar descuento a factura
   */
  @Post('invoices/:id/discount')
  @Roles('admin', 'financial')
  applyDiscount(
    @Param('id') id: string,
    @Body() discountDto: any,
    @CurrentUser() user: any,
  ) {
    return this.billingService.applyDiscount(+id, discountDto, user.id);
  }

  /**
   * Cancelar factura
   */
  @Post('invoices/:id/cancel')
  @Roles('admin', 'financial')
  cancelInvoice(@Param('id') id: string, @CurrentUser() user: any) {
    return this.billingService.cancelInvoice(+id, user.id);
  }
}

