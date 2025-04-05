import React from 'react';

const UserListPage = ({ data,onUserUpdated }) => {
  onUserUpdated();

  return ( 
    <div>
      <h2>User List</h2>
      <ul>
        {data?.map((user) => (
          <li key={user.id}>
            {user.username} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserListPage;
