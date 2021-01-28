import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const Search = (props) => {
	const [search, setSearch] = useState('');

	async function searchRecipes() {
		const res = await fetch(`https://cookeat-backend.herokuapp.com/recipes?search=${search}`);
		const data = await res.json();
		props.setRecipes(data);
	}

	return (
		<>
			<InputGroup className='mb-3'>
				<FormControl placeholder='' onChange={(e) => setSearch(e.target.value)} />
				<InputGroup.Append>
					<Button onClick={searchRecipes}>Search</Button>
				</InputGroup.Append>
			</InputGroup>
		</>
	);
};

export default Search;
