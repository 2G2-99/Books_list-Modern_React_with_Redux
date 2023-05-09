import axios from 'axios';
import { createContext, useState } from 'react';

const BooksContext = createContext();

// Custom provider
function Provider({ children }) {
	const [books, setBooks] = useState([]);

	const fetchBooks = async () => {
		const response = await axios.get('http://localhost:3001/books');

		setBooks(response.data);
	};

	const editBookById = async (id, title) => {
		const response = await axios.put(`http://localhost:3001/books/${id}`, {
			title,
		});

		const updatedBooks = books.map(book => {
			if (book.id === id) {
				return { ...book, ...response.data };
			}
			return book;
		});
		setBooks(updatedBooks);
	};

	const deleteBookById = async id => {
		await axios.delete(`http://localhost:3001/books/${id}`);

		const updatedBooks = books.filter(book => book.id !== id);
		setBooks(updatedBooks);
	};

	const createBook = async title => {
		const response = await axios.post('http://localhost:3001/books', {
			title,
		});

		const updatedBooks = [...books, response.data];
		setBooks(updatedBooks);
	};

	const booksUtils = {
		books,
		createBook,
		deleteBookById,
		editBookById,
		fetchBooks,
	};

	return (
		<BooksContext.Provider value={booksUtils}>{children}</BooksContext.Provider>
	);
}

export { Provider, BooksContext };
