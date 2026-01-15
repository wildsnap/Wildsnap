import { 
  Controller, 
  Post, 
  UseInterceptors, 
  UploadedFile, 
  HttpException, 
  HttpStatus 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { FileUploadDto } from './dto/predict.dto';


@ApiTags('AI Analysis')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('predict')
  @ApiOperation({ summary: 'Upload an animal image for identification' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Animal image file (jpg, png)',
    type: FileUploadDto,
  })
  async predict(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    
    return this.aiService.predict(file);
  }
}