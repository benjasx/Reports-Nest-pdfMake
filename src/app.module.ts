import { Module } from '@nestjs/common';
import { BasicReportsModule } from './basic-reports/basic-reports.module';
import { PrinterModule } from './printer/printer.module';
import { StoreReportModule } from './store-report/store-report.module';


@Module({
  imports: [BasicReportsModule, PrinterModule, StoreReportModule],
})
export class AppModule {}
