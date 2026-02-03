import { IsMongoId } from 'class-validator';

export class GetOffersQueryDto {
    industries?: number | string;
    category?: number | string;
    subcategory?: number | string;
    skills?: number | string;
    specialties?: number | string;
    sort?: '1' | '-1';
    page?: string;
  }
  
  export class GetOfferById {
    @IsMongoId()
    id: string;
  }