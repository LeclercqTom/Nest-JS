// import { Expose, plainToClass } from 'class-transformer';

export interface Worker {
  employee_id: string;
  profile: {
    first_name: string;
    last_name: string;
  };
  nationality: string;
  department_id: number;
  national_id_number: string;
  bank_account_number: string;
  salary: {
    monthly_salary: number;
  };
  job_title: string;
  contract_start_date: string;
  contract_end_date: string | null;
}

// export class WorkerDto implements Worker {
//   employee_id: string;

//   @Expose({ groups: ['identity'] })
//   profile: {
//     first_name: string;
//     last_name: string;
//   };

//   nationality: string;
//   department_id: number;
//   national_id_number: string;
//   bank_account_number: string;

//   @Expose({ groups: ['salary'] })
//   salary: {
//     monthly_salary: number;
//   };

//   job_title: string;
//   contract_start_date: string;
//   contract_end_date: string | null;
// }
