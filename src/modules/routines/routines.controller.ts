import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoutinesService } from './routines.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateDailyLogDto } from './dto/update-daily-log.dto';
import { TrackingQueryDto } from './dto/tracking-query.dto';
import { CompareAnalysesDto } from './dto/compare-analyses.dto';
import { SimpleResponse } from '../../common/dtos';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/user.decorator';

@ApiTags('routines')
@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('')
  @Post()
  async create(@GetUser('id') userId: string, @Body() dto: CreateRoutineDto) {
    const data = await this.routinesService.createRoutine({ ...dto, userId });
    return new SimpleResponse(data, 'Routine created successfully', 201);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('')
  @Get()
  async getByUser(@GetUser('id') userId: string) {
    const data = await this.routinesService.getLatestRoutineByUser(userId);
    return new SimpleResponse(data, 'Get routine by user', 200);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('')
  @Get('steps/:id')
  async getStepDetail(@Param('id') id: string): Promise<SimpleResponse<any>> {
    const data = await this.routinesService.getStepDetail(id);
    return new SimpleResponse(data, 'Get routine step detail', 200);
  }

  // Create daily logs for today
  @Post('daily-logs')
  async createDailyLogs(): Promise<SimpleResponse<any>> {
    const data = await this.routinesService.createDailyLogs();
    return new SimpleResponse(data, 'Daily logs created successfully', 201);
  }

  // Create and check daily logs for all active routines (manual trigger)
  @Post('daily-logs/check-all')
  async createAndCheckDailyLogs(): Promise<SimpleResponse<any>> {
    const data = await this.routinesService.createAndCheckDailyLogs();
    return new SimpleResponse(
      data,
      'Daily logs checked and created successfully',
      201,
    );
  }

  // Update daily log completion status
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('')
  @Patch('daily-logs/:id')
  async updateDailyLog(
    @Param('id') id: string,
    @Body() dto: UpdateDailyLogDto,
  ): Promise<SimpleResponse<any>> {
    const data = await this.routinesService.updateDailyLog(
      id,
      dto.is_completed,
    );
    return new SimpleResponse(data, 'Daily log updated successfully', 200);
  }

  // Get tracking overview with date range filter
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('')
  @Get('tracking/overview')
  async getTrackingOverview(
    @GetUser('userId') userId: string,
    @Query() query: TrackingQueryDto,
  ): Promise<SimpleResponse<any>> {
    const data = await this.routinesService.getTrackingOverview(
      userId,
      query.startDate,
      query.endDate,
    );
    return new SimpleResponse(data, 'Get tracking overview', 200);
  }

  // Get daily logs with date range filter
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('')
  @Get('tracking/daily-logs')
  async getDailyLogs(
    @GetUser('id') userId: string,
    @Query() query: TrackingQueryDto,
  ): Promise<SimpleResponse<any>> {
    const data = await this.routinesService.getDailyLogs(
      userId,
      query.startDate,
      query.endDate,
    );
    return new SimpleResponse(data, 'Get daily logs', 200);
  }

  // Get user skin analyses with trend information
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('')
  @Get('tracking/skin-analyses')
  async getUserSkinAnalyses(
    @GetUser('id') userId: string,
  ): Promise<SimpleResponse<any>> {
    const data = await this.routinesService.getUserSkinAnalyses(userId);
    return new SimpleResponse(data, 'Get user skin analyses', 200);
  }

  // Compare two skin analyses
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('')
  @Post('tracking/compare')
  async compareAnalyses(
    @GetUser('id') userId: string,
    @Body() dto: CompareAnalysesDto,
  ): Promise<SimpleResponse<any>> {
    const data = await this.routinesService.compareAnalyses(
      userId,
      dto.analysisId1,
      dto.analysisId2,
    );
    return new SimpleResponse(data, 'Compare analyses', 200);
  }
}
