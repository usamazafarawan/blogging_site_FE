export interface SubCategory {
  name: string;
  id?:string;
}

export interface Category {
  name: string;
    id?:string;
  subCategories: SubCategory[];
}