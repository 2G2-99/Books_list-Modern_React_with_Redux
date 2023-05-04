import { useEffect, useState } from 'react';

import BookCreate from './components/BookCreate';
import BookList from './components/BookList';
import axios from 'axios';

function App() {
	const [books, setBooks] = useState([]);

	const fetchBooks = async () => {
		const response = await axios.get('http://localhost:3001/books');

		setBooks(response.data);
	};

	useEffect(() => {
		fetchBooks();
	}, []);

	const createBook = async title => {
		const response = await axios.post('http://localhost:3001/books', {
			title,
		});

		const updatedBooks = [...books, response.data];
		setBooks(updatedBooks);
	};

	const deleteBookById = async id => {
		await axios.delete(`http://localhost:3001/books/${id}`);

		const updatedBooks = books.filter(book => book.id !== id);
		setBooks(updatedBooks);
	};

	const editBookById = async (id, title) => {
		const response = axios.put(`http://localhost:3001/books/${id}`, {
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

	return (
		<>
			<BookList
				books={books}
				onDelete={deleteBookById}
				onEdit={editBookById}
			/>
			<BookCreate onCreate={createBook} />
		</>
	);
}

export default App;