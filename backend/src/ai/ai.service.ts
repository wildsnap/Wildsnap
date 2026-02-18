import { Injectable } from '@nestjs/common';
import axios from 'axios';
import FormData = require('form-data');

@Injectable()
export class AiService {
  private AI_URL = process.env.GOOGLE_CLOUD_AI_URL || 'http://localhost:8000/predict';

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
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });

      return data; 

    } catch (error) {
      console.error('AI Service Connection Error:', error.message);
      if (error.response) {
        console.error('AI Response Data:', error.response.data);
        console.error('AI Response Status:', error.response.status);
      }
      throw new Error('Failed to connect to AI Model Service');
    }
  }
}