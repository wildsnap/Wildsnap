import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class PurchaseItemDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  readonly itemId: number;

  @IsString()
  @IsNotEmpty()
  readonly clerkId: string;
}
