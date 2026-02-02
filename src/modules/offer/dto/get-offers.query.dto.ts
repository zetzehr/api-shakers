export class GetOffersQueryDto {
    industries?: number[];
    category?: number[];
    subcategory?: number[];
    skills?: number[];
    specialties?: number[];
    sort?: '1' | '-1';
    page?: string;
  }
  