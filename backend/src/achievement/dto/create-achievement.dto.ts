import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';

export class CreateAchievementDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  criteriaType: string;

  @IsInt()
  @Min(1)
  targetValue: number;

  @IsInt()
  @Min(0)
  rewardPoints: number;
}