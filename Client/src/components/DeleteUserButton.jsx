import {useState} from 'react';
import { deleteUser } from '../services/api'; // Import deleteUser from api.js

function DeleteUserButton ({OnUserDeleted}) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      // Call the deleteUser function from the api service
      await deleteUser();
      alert('All users deleted successfully!');
      OnUserDeleted(); // Notify parent component about user deletion
    } catch (error) {
      // If there's an error, display the error message
      setErrorMessage('Failed to delete users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? 'Deleting...' : 'Delete All Users'}
      {errorMessage && <p>{errorMessage}</p>}
    </button>
  );
}

export default DeleteUserButton;