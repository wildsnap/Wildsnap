// ai/ai.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AiService {
  private AI_URL = 'http://localhost:8000/predict/url';

  async predict(imageUrl: string) {
    const { data } = await axios.post(this.AI_URL, {
      image_url: imageUrl,
    });

    return data;
  }
}
