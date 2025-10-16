import React from "react";
import type { Book } from "./types";
import {
  ChevronUpIcon, // Indicates ascending sort (A-Z, 1-10, Oldest-Newest)
  ChevronDownIcon, // Indicates descending sort (Z-A, 10-1, Newest-Oldest)
  ChevronUpDownIcon, // Indicates the column is unsorted / available for sorting
} from "@heroicons/react/20/solid"; // or /24/outline for a larger icon
// Define the hardcoded data array for Books
const bookData: Book[] = [
  {
    id: 1,
    title: "Daisies in the field",
    author: "Alex Johnson",
    borrowStatus: "Available",
    publicationYear: 1992,
    dateBorrowed: new Date("2025-09-06"),
  },
  {
    id: 2,
    title: "Waterworld",
    author: "Jenny Spikes",
    borrowStatus: "On loan",
    publicationYear: 2004,
    dateBorrowed: new Date("2025-10-01"),
  },
  {
    id: 3,
    title: "Green Grass",
    author: "Labra Dor",
    borrowStatus: "Available",
    publicationYear: 2025,
    dateBorrowed: new Date("2025-08-02"),
  },
];
// 	Array Notation: This denotes that the type is an array of the preceding type. So its an array of objects of a type Book with certain fields that have been defined in types.

// Define the column headers (optional, could be hardcoded in the JSX)
const columnHeaders: string[] = [
  "ID",
  "Title",
  "Author",
  "Year Published",
  "Borrow Status",
  "Due date",
];

// The functional component takes NO PROPS atm
const Table = () => {
  // The Explicit Type. FC stands for Functional Component.
  return (
    <div className="overflow-x-auto shadow-lg rounded-xl">
      <table className="w-full table-auto min-w-max">
        {/* Table Header */}
        <thead className="text-black-600 uppercase">
          <tr className="bg-slate-600">
            {columnHeaders.map((header) => (
              <th
                className="p-4 font-semibold cursor-pointer text-left text-sm border-b border-white-400"
                key={header}
                onClick={() => alert(`sorting ${header}`)}
              >
                <div className="flex items-center">
                  <span>{header}</span>
                  <ChevronDownIcon className="size-4 ml-1 text-white-900" />
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {bookData.map((book) => (
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
              {/* 
              <td>
                <button onClick={() => alert(`Viewing ${book.title}`)}>
                  View
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
