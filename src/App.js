import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${searchQuery}`);
      setUsers(response.data.items);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
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
        {users.map(user => (
          <div key={user.id}>
            <img src={user.avatar_url} alt={user.login} width="50" height="50" />
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">{user.login}</a>
          </div>
        ))}
      </div>
    </div>
    <footer className=''>Bu uygulama sevgili arkadaşım Oktay Hızarcı'ya ithafen yapılmıştır.</footer></>
  );
}

export default App;
