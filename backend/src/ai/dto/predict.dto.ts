import { ApiProperty } from '@nestjs/swagger';

export class PredictDto {
  @ApiProperty()
  imageUrl: string;
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
