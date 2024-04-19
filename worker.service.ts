import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Worker } from './worker.interface';

@Injectable()
export class WorkersService {
  private readonly workers: Worker[];

  constructor() {
    const rawData = fs.readFileSync('worker.json');
    this.workers = JSON.parse(rawData.toString());
  }

  create(worker: Worker) {
    this.workers.push(worker);
  }

  findAll(): Worker[] {
    return this.workers;
  }

  findOne(id: string): Worker | undefined {
    return this.workers.find(worker => worker.employee_id === id);
  }

  filterWorkerData(worker: any, scope: string): any {
    if (scope === 'salary') {
      return {
        employee_id: worker.employee_id,
        bank_account_number: worker.bank_account_number,
        monthly_salary: worker.monthly_salary,
      };
    }
    if (scope === 'identity') {
      return {
        employee_id: worker.employee_id,
        first_name: worker.first_name,
        last_name: worker.last_name,
        nationality: worker.nationality,
        national_id_number: worker.national_id_number,
      };
    }
    return {
        employee_id: worker.employee_id,
        first_name: worker.first_name,
        last_name: worker.last_name,
        nationality: worker.nationality,
        department_id: worker.department_id,
        national_id_number: worker.national_id_number,
        job_title: worker.job_title,
        contract_start_date: worker.contract_start_date,
        contract_end_date: worker.contract_end_date
   
    }
  }
}

// import { Injectable } from '@nestjs/common';
// import * as fs from 'fs';
// import { WorkerDto } from './worker.interface';
// import { plainToClass } from 'class-transformer';

// @Injectable()
// export class WorkersService {
//   private readonly workers: WorkerDto[];

//   constructor() {
//     const rawData = fs.readFileSync('worker.json');
//     const workersData = JSON.parse(rawData.toString());
//     this.workers = workersData.map(workerData => plainToClass(WorkerDto, workerData));
//   }

//   create(worker: WorkerDto) {
//     this.workers.push(worker);
//   }

//   findAll(): WorkerDto[] {
//     return this.workers;
//   }

//   findOne(id: string): WorkerDto | undefined {
//     return this.workers.find(worker => worker.employee_id === id);
//   }

//   filterWorkerData(worker: WorkerDto, scope: string): any {
//     const options = { groups: [scope] };
//     return plainToClass(WorkerDto, worker, options);
//   }
// }

