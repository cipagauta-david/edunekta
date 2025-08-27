import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
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
import { FacturasController } from './infrastructure/controllers';
import { FacturasService } from './infrastructure/services';
import { InstitutionsModule } from 'libs/domains/institutions/src/institutions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Factura,
      ConceptoFacturacion,
      DetalleFactura,
      Pago,
    ]),
    InstitutionsModule,
  ],
  controllers: [
    FacturasController,
    ConceptoFacturacionController,
    DetalleFacturaController,
    PagoController,
  ],
  providers: [
    FacturasService,
    ConceptoFacturacionService,
    DetalleFacturaService,
    PagoService,
    FacturaDao,
    ConceptoFacturacionDao,
    DetalleFacturaDao,
    PagoDao,
  ],
  exports: [
    FacturasService,
    ConceptoFacturacionService,
    DetalleFacturaService,
    PagoService,
  ],
})
export class FinancialModule {}
