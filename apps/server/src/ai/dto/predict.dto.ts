// ai/dto/predict.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class PredictDto {
  @ApiProperty()
  imageUrl: string;
}
