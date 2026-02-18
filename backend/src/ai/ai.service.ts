import { Injectable } from '@nestjs/common';
import axios from 'axios';
import FormData = require('form-data');

const CONFIDENCE_THRESHOLD = 85;

@Injectable()
export class AiService {
  private AI_URL =
    process.env.GOOGLE_CLOUD_AI_URL || 'http://localhost:8000/predict';

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

      if (data.confidence < CONFIDENCE_THRESHOLD) {
        return {
          class_name: 'Unknown',
          confidence: data.confidence,
          fun_fact:
            'AI is not sure what this is. Please try getting closer or better lighting.',
          rarity: 'Common',
          message: 'Low confidence detection',
        };
      }

      // const normalizedName = data.class_name.replace(/_/g, ' ');
      // const animal = await this.prisma.animal.findFirst({
      //   where: {
      //     name: {
      //       equals: normalizedName,
      //       mode: 'insensitive', // ค้นหาแบบไม่สนตัวพิมพ์เล็ก-ใหญ่
      //     },
      //   },
      // });

      // if (!animal) {
      //   console.warn(`Animal ${normalizedName} found by AI but missing in DB.`);
      //   return {
      //     class_name: normalizedName,
      //     confidence: data.confidence,
      //     fun_fact: 'New discovery! Data coming soon.',
      //     rarity: 'Common',
      //   };
      // }

      // return {
      //   id: animal.id,
      //   class_name: animal.name,
      //   scientific_name: animal.scientificName,
      //   description: animal.description,
      //   habitat: animal.habitat,
      //   fun_fact: animal.funFact,
      //   rarity: this.formatRarity(animal.rarityLevel),
      //   confidence: data.confidence,
      //   imageUrl: animal.imageUrl,
      //   points_reward: animal.pointsReward,
      // };

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
