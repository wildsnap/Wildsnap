import { Injectable } from '@nestjs/common';
import axios from 'axios';
import FormData = require('form-data');

@Injectable()
export class AiService {
  private AI_URL = 'http://localhost:8000/predict';

  async predict(file: Express.Multer.File) {
    const formData = new FormData();
    
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    try {
      const { data } = await axios.post(this.AI_URL, formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      return data;
    } catch (error) {
      console.error('FastAPI Connection Error:', error.message);
      throw new Error('AI Service is currently unavailable');
    }
  }
}