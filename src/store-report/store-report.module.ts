import { Module } from '@nestjs/common';
import { StoreReportService } from './store-report.service';
import { StoreReportController } from './store-report.controller';
import { PrinterModule } from 'src/printer/printer.module';

@Module({
  controllers: [StoreReportController],
  providers: [StoreReportService],
  imports:[PrinterModule]
})
export class StoreReportModule {}
