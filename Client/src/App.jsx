import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//import Products from './Pages/Products.jsx'
import RegisterPage from './Pages/ResigisterPage.jsx';
import UserListPage from './Pages/UserListPage.jsx';
import DeleteUserButton from './components/DeleteUserButton.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchUsers } from './services/api.js';


function App() {
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState([]); // Initialize users state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
    
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetchUsers();
        setUsers(response); // Update users state with fetched data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }
  , []); // Empty dependency array to run only once on mount
  
  const handleUpdatedUser = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data); // Update users state with fetched data
    }catch (error) {
      setError('Failed to fetch updated user 2 ' + error.message);
    }
  }

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <RegisterPage onUserRegistered={handleUpdatedUser} />
          <DeleteUserButton OnUserDeleted={handleUpdatedUser} />
          <UserListPage data={users} /> {// Pass the users data to UserListPage //}
          
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div> */}
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage RegisterPage onUserRegistered={handleUpdatedUser} />} />
        <Route path="/users" element={<UserListPage data={users} onUserUpdated={handleUpdatedUser}/>} />
        
      </Routes>
    </Router>
    <button onClick={() => (window.location.href = '/')}>back</button>
    <DeleteUserButton OnUserDeleted={handleUpdatedUser} />
    <button onClick={() => window.open('/users', '_blank')}>Open Users in New Tab</button>
    </>
  )
}

export default App
