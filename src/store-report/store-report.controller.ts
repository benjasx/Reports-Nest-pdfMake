import { Controller, Get, Param, Res } from '@nestjs/common';
import { StoreReportService } from './store-report.service';
import { Response } from 'express';

@Controller('store-report')
export class StoreReportController {
  constructor(private readonly storeReportService: StoreReportService) {}

  @Get('orders/:orderId')
  async getOrderReport(
    @Res() response: Response,
    @Param('orderId') orderId: string,
  ) {
    const pdfDoc = await this.storeReportService.getOrderById(+orderId);

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'OrderReport';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
