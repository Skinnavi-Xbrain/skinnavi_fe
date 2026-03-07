import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule, ScheduleModule.forRoot()],
  controllers: [RoutinesController],
  providers: [RoutinesService],
})
export class RoutinesModule {}
