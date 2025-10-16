// 1. Define the hardcoded data structure of Book item that will be row data
export interface Book {
  id: number;
  title: string;
  author: string;
  publicationYear: number;
  dateBorrowed: Date;
  borrowStatus: 'Available' | 'On loan';
}
//2.Define interface for sortstate
export interface SortState {
  key?: keyof Book; //this means that it must be id,title,author etc - all properties of Book
  direction?: 'asc' | 'desc';
// ? means property is optional
}