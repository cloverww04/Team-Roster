import { useRouter } from 'next/router';
import { useState } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();
  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({ pathname: '/viewTeam', query: `search=${searchInput}` });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel controlId="floatingInput1" label="Search a champion's name" className="search">
        <Form.Control
          type="text"
          placeholder="Search"
          name="value"
          value={searchInput}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
    </Form>
  );
}
