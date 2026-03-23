import { IsBoolean, IsOptional, IsEnum } from 'class-validator';
import { ScreenMode, Language } from '../../generated/prisma/enums';

export class UpdateSettingsDto {
  @IsOptional()
  @IsBoolean()
  hasMusic?: boolean;

  @IsOptional()
  @IsBoolean()
  hasSound?: boolean;

  @IsOptional()
  @IsBoolean()
  hasVibration?: boolean;

  @IsOptional()
  @IsEnum(ScreenMode)
  screenMode?: ScreenMode;

  @IsOptional()
  @IsEnum(Language)
  language?: Language;
}
