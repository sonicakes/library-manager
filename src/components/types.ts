// 1. Define the hardcoded data structure of Book item that will be row data
export interface Book {
  id: number;
  title: string;
  author: string;
  publicationYear: number;
  dateBorrowed: Date;
  borrowStatus: 'Available' | 'On loan';
}