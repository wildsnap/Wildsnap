import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { PredictDto } from './dto/predict.dto';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('predict')
  @ApiOperation({ summary: 'Predict image by URL' })
  async predict(@Body() dto: PredictDto) {
    return this.aiService.predict(dto.imageUrl);
  }
}
