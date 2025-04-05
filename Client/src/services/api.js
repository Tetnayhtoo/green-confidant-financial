// client/src/services/api.js

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

console.log('API_URL:', API_URL); // Log the API URL for debugging

export const registerUser = async (username, password, email) => {
  const response = await fetch(`${API_URL}users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email })
  });

  if (!response.ok) {
    // Log the error message for debugging
    const errorData = (await response.json()).message;
    console.log('Error response:',errorData);
    throw new Error(`Register Failed 2 ${errorData}`);
  }

  return response.json();
};

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const deleteUser = async () => {
  const response = await fetch(`${API_URL}users`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete users');
  }

  return response.json();
}
