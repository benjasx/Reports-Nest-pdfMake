import fs from 'fs';

import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from 'src/reports/sections/header.sectios';
import { getHtmlContent } from 'src/helpers';
import { footerSecction } from 'src/reports/sections/footer.section';

@Injectable()
export class ExtraReportService {
  constructor(private readonly printerService: PrinterService) {}
  getHtmlReport() {

    const html = fs.readFileSync('src/reports/html/basic-03.html', 'utf-8');
    const content = getHtmlContent(html,{
        client: 'Benjamin',
        title:'Curso de NestJS',
    });
   const docDefinition:TDocumentDefinitions = {
    pageMargins: [40, 110, 40, 60],
    header:headerSection({
        title:'Html to PdfMake',
        subTitle:'Html to PdfMake',
    }),
    footer:footerSecction,
    content:content,

   }
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
