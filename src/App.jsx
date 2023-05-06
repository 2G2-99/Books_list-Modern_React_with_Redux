import { useEffect, useState } from 'react';

import BookCreate from './components/BookCreate';
import BookList from './components/BookList';
import axios from 'axios';

function App() {
	useEffect(() => {
		fetchBooks();
	}, []);

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
