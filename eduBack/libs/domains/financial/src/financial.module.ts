import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { InvoicesController } from './infrastructure/controllers/invoices.controller';
import { InvoicesService } from './infrastructure/services/invoices.service';
import { ConceptoFacturacion } from './entities/concepto-facturacion.entity';
import { DetalleFactura } from './entities/detalle-factura.entity';
import { Pago } from './entities/pago.entity';
import { ConceptoFacturacionController } from './infrastructure/controllers/concepto-facturacion.controller';
import { DetalleFacturaController } from './infrastructure/controllers/detalle-factura.controller';
import { PagoController } from './infrastructure/controllers/pago.controller';
import { ConceptoFacturacionService } from './infrastructure/services/concepto-facturacion.service';
import { DetalleFacturaService } from './infrastructure/services/detalle-factura.service';
import { PagoService } from './infrastructure/services/pago.service';
import { FacturaDao } from './infrastructure/daos/factura.dao';
import { ConceptoFacturacionDao } from './infrastructure/daos/concepto-facturacion.dao';
import { DetalleFacturaDao } from './infrastructure/daos/detalle-factura.dao';
import { PagoDao } from './infrastructure/daos/pago.dao';

@Module({
  imports: [TypeOrmModule.forFeature([Factura, ConceptoFacturacion, DetalleFactura, Pago])],
  controllers: [InvoicesController, ConceptoFacturacionController, DetalleFacturaController, PagoController],
  providers: [
    InvoicesService,
    ConceptoFacturacionService,
    DetalleFacturaService,
    PagoService,
    FacturaDao,
    ConceptoFacturacionDao,
    DetalleFacturaDao,
    PagoDao,
  ],
  exports: [InvoicesService, ConceptoFacturacionService, DetalleFacturaService, PagoService],
})
export class FinancialModule {}
