import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class PurchaseItemDto {
  @IsString()
  clerkId: string;

  @IsNumber()
  itemId: number;

  @IsOptional()
  @IsBoolean()
  isSpecialOffer?: boolean; // ADD THIS FLAG
}