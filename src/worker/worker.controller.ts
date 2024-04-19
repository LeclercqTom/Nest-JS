import { Controller, Get, Post, Param, Request, UseGuards } from '@nestjs/common';
import { WorkersService } from './worker.service';
import { WorkerGuard } from './worker.guard';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workerService: WorkersService) {}

  @Post()
  create(): string {
    return 'This action adds a new worker';
  }

  @Get()
  @UseGuards(WorkerGuard)
  async findAll(@Request() req) {
    const scope = req.user.scope;
    const workers = this.workerService.findAll();
    return workers.map(worker => this.workerService.filterWorkerData(worker, scope));
  }

  @Get(':id')
  @UseGuards(WorkerGuard)
  async findOne(@Param('id') id: string, @Request() req) {
    const worker = this.workerService.findOne(id);
    if (!worker) {
      return "L'id n'existe pas ";
    }
    const scope = req.user.scope;
    return this.workerService.filterWorkerData(worker, scope);
  }
}
