import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${searchQuery}`);
      setUsers(response.data.items);
      console.log(response.data.items)
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const totalPages = Math.ceil(users.length / usersPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
      <button key={i} onClick={() => setCurrentPage(i)}>{i}</button>
    );
  }

  return pageNumbers;
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <><div>
      <h1>GitHub User Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search users on GitHub" />
        <button type="submit">Search</button>
      </form>
      <div>
      {users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage).map(user => (
        <div key={user.id}>
          <img src={user.avatar_url} alt={user.login} width="75" height="75" />
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">{user.login}</a>
        </div>
      ))}
    </div>
    <br />
    <p className='list-user'>{users.length} account found!</p>
    <div>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
      {renderPageNumbers()}
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
    </div>
    </div>
    <br/>
    <footer className=''>Bu uygulama sevgili arkadaşım Oktay Hızarcı'ya ithafen yapılmıştır.</footer></>
  );
}

export default App;
