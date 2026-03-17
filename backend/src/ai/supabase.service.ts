import { Injectable, Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;
  private readonly logger = new Logger(SupabaseService.name);

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!,
    );
  }

  async uploadImage(file: Express.Multer.File): Promise<string | null> {
    try {
      const fileExt = file.originalname.split('.').pop() || 'jpg';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload into bucket "scanlog"
      const { error } = await this.supabase.storage
        .from('scanlog')
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (error) {
        this.logger.error(`Supabase Upload Error: ${error.message}`);
        return null;
      }

      // Get public URL
      const { data } = this.supabase.storage
        .from('scanlog')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (err) {
      this.logger.error('Failed to upload image to Supabase', err);
      return null;
    }
  }
}
