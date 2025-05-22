import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import {
  getBasicChatSvgReport,
  getHelloWorldReport,
  getStatisticReport,
  orderByIdReport,
} from 'src/reports';

@Injectable()
export class StoreReportService extends PrismaClient implements OnModuleInit {
  [x: string]: any;
  async onModuleInit() {
    await this.$connect();
    /* console.log('Connected to the database!!!') */
  }
  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async getOrderById(orderId: number) {
    const order = await this.orders.findUnique({
      where: {
        order_id: orderId,
      },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} Not Found`);
    }

    const docDefinition = orderByIdReport({
      data: order as any,
    });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getSvgsCharts() {
    const docDefinition = await getBasicChatSvgReport();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getStatistics() {
    const topCountries = await this.customers.groupBy({
      by: ['country'],
      _count: {
        country: true,
      },
      orderBy: {
        _count: {
          country: 'desc',
        },
      },
      take: 10,
    });

    const topCountryData = topCountries.map(({ country, _count }) => ({
      country: country ?? '',
      customerCount: _count.country, // ✅ nombre correcto
    }));

    const docDefinition = await getStatisticReport({
      topCountries: topCountryData,
    });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
