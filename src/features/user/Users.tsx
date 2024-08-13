import { useUser } from './useUser';
import styled from 'styled-components';
import UserList, { UserListProps } from './UserList';

const StyledUsers = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // 1 column on small screens
  }
`;
const Users = () => {
  const { users, isLoading } = useUser();
  if (isLoading) return 'Loading...';

  return (
    <>
      <h1>Users</h1>
      <StyledUsers>
        {users?.map((user: UserListProps) => (
          <UserList key={user.name} {...user} />
        ))}
      </StyledUsers>
    </>
  );
};

export default Users;
