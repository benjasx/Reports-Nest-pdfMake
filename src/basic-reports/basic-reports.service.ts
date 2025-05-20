import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { employmentLetterReport, getCountryReport, getEmployementLetterByIdReport } from 'src/reports';
import { getHelloWorldReport } from 'src/reports/hello-world.report';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    /* console.log('Connected to the database!!!') */
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  hello() {
    const docDefinition = getHelloWorldReport({
      name: 'Benjamín Sanchéz',
    });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  employmentLetter() {
    const docDefinition = employmentLetterReport();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async employmentLetterById(id: number) {
    const employee = await this.employees.findUnique({
      where: {
        id: id,
      },
    });

    console.log(employee)

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} Not Found`);
    }
    const docDefinition = getEmployementLetterByIdReport({
        employerName: 'Benjamin Sanchez Robledo',
        employerPosition:'Gerente General',
        employeeName:employee.name,
        employeePosition:employee.position,
        employeeStartDate:employee.start_date,
        employeeHours:employee.hours_per_day,
        employeeWorkSchedule:employee.work_schedule,
        employerCompany:'Benjax Code Corp.',
    });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }


  async getCountries(){
    const countries = await this.countries.findMany({
      where:{
        local_name:{
          not: null,
        }
      }
    });
    const docDefinition = getCountryReport({countries: countries});

    return this.printerService.createPdf(docDefinition);
  }
}
