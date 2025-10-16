import React, {useState, useEffect} from "react";
import type { Book, SortState } from "./types";
import {
  ChevronUpIcon, // Indicates ascending sort (A-Z, 1-10, Oldest-Newest)
  ChevronDownIcon, // Indicates descending sort (Z-A, 10-1, Newest-Oldest)
} from "@heroicons/react/20/solid"; // or /24/outline for a larger icon
// Define the hardcoded data array for Books
const bookData: Book[] = [

  // {
  //   id: 78,
  //   title: "Daisies in the field",
  //   author: "Alex Johnson",
  //   borrowStatus: "Available",
  //   publicationYear: 1992,
  //   dateBorrowed: new Date("2025-09-06"),
  // },
  // {
  //   id: 29,
  //   title: "Waterworld",
  //   author: "Jenny Spikes",
  //   borrowStatus: "On loan",
  //   publicationYear: 1985,
  //   dateBorrowed: new Date("2025-10-01"),
  // },
  // {
  //   id: 32,
  //   title: "Green Grass",
  //   author: "Labra Dor",
  //   borrowStatus: "Available",
  //   publicationYear: 2025,
  //   dateBorrowed: new Date("2025-08-02"),
  // },
];
// 	Array Notation: This denotes that the type is an array of the preceding type. So its an array of objects of a type Book with certain fields that have been defined in types.

// Define the column headers (optional, could be hardcoded in the JSX)
const columnHeaders: {name: string, key: keyof Book}[] = [
  {name: "ID", key: 'id'},
  {name: "Title", key: 'title'},
  {name: "Author", key: 'author'},
  {name: "Year Published", key: 'publicationYear'},
  {name: "Borrow Status", key: 'borrowStatus'},
  {name: "Date Borrowed", key: 'dateBorrowed'},
];

// The functional component takes NO PROPS atm
const Table = () => {
  //instead of using hardcoded bookdata, we are using now loaded data, so initial array will be empty
  const [sortedData, setSortedData] = useState<Book[]>([]); 
  const [sortState, setSortState] = useState<SortState>({ }); //or {key:undefined; direction:undefined}
  const [isLoading, setIsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  // The Explicit Type: FC stands for Functional Component.

  // 2. Fetch data when the component mounts
  useEffect(() => {
    // The path is relative to the 'public' folder
    fetch('/books.json') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        //first we convert to response.json, then chaining another .then
        return response.json();
      })
      .then((data: Book[]) => {
        // 3. Process the data (especially dates)
        console.log(data)
        const processedData: Book[] = data.map(book => ({
          ...book,
          // Convert the string date from the JSON file into a JavaScript Date object
          dateBorrowed: new Date(book.dateBorrowed), 
        }));
        
        // 4. Update the state
        setSortedData(processedData); 
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Could not fetch data:", error);
        setIsLoading(false);
      });
  }, []); // Empty dependency array ensures this runs only ONCE after mount

  const handleSort = (key: keyof Book, direction: 'asc' | 'desc') => {
  
    // A. Set the new active sort state
    setSortState({ key, direction });
  
    // B. Sort the data using the passed direction
    const sorted = [...sortedData].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      let comparison = 0;
  
      // Core comparison logic (works for strings, numbers, and Dates)
      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }
  
      // C. Apply the passed direction
      return direction === 'asc' ? comparison : comparison * -1;
    });
  
    // D. Update the component's state with the new sorted data
    setSortedData(sorted);
  };

  const filterData = (data: Book[], keyword: string) => {
    // case insensitive
    if (!keyword) {
      return data; // Return all data if the keyword is empty
    }
  
    const lowerCaseKeyword = keyword.toLowerCase();
  
    return data.filter(book => {
      const titleMatch = book.title.toLowerCase().includes(lowerCaseKeyword);
      const authorMatch = book.author.toLowerCase().includes(lowerCaseKeyword); 
      
      // Check if the keyword exists in EITHER the title OR the author
      return titleMatch || authorMatch;
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    const newKeyword = event.target.value;
    setSearchKeyword(newKeyword);

    // Filter the data based on the new keyword
    const filteredData = filterData(bookData, newKeyword);

    //set filtered books as setSortedData
    setSortedData(filteredData);

  }

  if (isLoading) {
    return <div>Loading books data...</div>;
  }

  return (
    <>
          <input className="bg-white text-black" type='text' placeholder="Search by Title or Author..." value={searchKeyword} onChange={handleSearchChange}/>
          <div className="overflow-x-auto shadow-lg rounded-xl">
      <table className="w-full table-auto min-w-max">
        {/* Table Header */}
        <thead className="text-black-600 uppercase">
          <tr className="bg-slate-600">
            {columnHeaders.map((header) => (
              <th
                className="p-4 font-semibold cursor-pointer text-left text-sm border-b border-white-400"
                key={header.key}
              >
                <div className="flex items-center">
                  <span>{header.name}</span>
                  <div className="flex items-center flex-col">                  
                    <ChevronUpIcon className="size-4 ml-1 text-white-900" onClick={() => handleSort(header.key, 'asc')}/>
                    <ChevronDownIcon className="size-4 ml-1 text-white-900" onClick={() => handleSort(header.key, 'desc')}/>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {sortedData.map((book) => (
            <tr
              key={book.id}
              className="border-b bg-gray-800 hover:bg-gray-500 transition-colors"
            >
              <td className="p-4 text-sm text-white-700">{book.id}</td>
              <td className="p-4 text-sm text-white-700">{book.title}</td>
              <td className="p-4 text-sm text-white-700">{book.author}</td>

              <td className="p-4 text-sm text-white-700">
                {book.publicationYear}
              </td>
              <td className="p-4 text-sm text-white-700">
                <span
                  style={{
                    color: book.borrowStatus === "Available" ? "green" : "red",
                  }}
                >
                  {book.borrowStatus}
                </span>
              </td>
              <td className="p-4 text-sm text-white-700">
                {book.dateBorrowed.toLocaleDateString()}
              </td>
           
        
            </tr>
          ))}
        </tbody>
      </table>
    </div>
          </>

  );
};

export default Table;
