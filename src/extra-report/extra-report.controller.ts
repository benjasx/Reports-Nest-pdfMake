import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportService } from './extra-report.service';
import { Response } from 'express';

@Controller('extra-report')
export class ExtraReportController {
  constructor(private readonly extraReportService: ExtraReportService) {}

  @Get('html-report')
  async getHtmlReport(@Res() response: Response) {
    const pdfDoc = this.extraReportService.getHtmlReport();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hola';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
