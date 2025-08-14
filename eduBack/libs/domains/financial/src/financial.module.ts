import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { InvoicesController } from './infrastructure/controllers/invoices.controller';
import { InvoicesService } from './infrastructure/services/invoices.service';

@Module({
  imports: [TypeOrmModule.forFeature([Factura])],
  controllers: [InvoicesController],
  providers: [InvoicesService],
  exports: [InvoicesService],
})
export class FinancialModule {}
