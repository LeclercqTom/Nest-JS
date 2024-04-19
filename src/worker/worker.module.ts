import { Module } from '@nestjs/common';
import { WorkersController } from './worker.controller';
import { WorkersService } from './worker.service';

@Module({
  controllers: [WorkersController],
  providers: [WorkersService],
  exports: [WorkersService],
})
export class WorkersModule {}