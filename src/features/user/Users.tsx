import { useUser } from './useUser';
import styled from 'styled-components';
import UserList, { UserListProps } from './UserList';
import { useState } from 'react';
import Button from '../../components/button/Button';

const StyledUsers = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // 1 column on small screens
  }
`;
const StyledPaginationContainer = styled.div`
  width: 100%;
  background-color: var(--color-grey-100);
  padding: 1rem;
  margin-top: 1rem;
`;
const Users = () => {
  const { users, isLoading, count } = useUser();
  const [currentPage, setCurrentPage] = useState(1);

  const USERS_PER_PAGE = 6;

  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const currentUsers = users?.slice(0, indexOfLastUser);

  // Handler for "Show more" button click
  const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (isLoading) return 'Loading...';

  return (
    <>
      <h1>Users</h1>
      <StyledUsers>
        {currentUsers?.map((user: UserListProps) => (
          <UserList key={user.name} {...user} />
        ))}
      </StyledUsers>
      {count > USERS_PER_PAGE && (
        <StyledPaginationContainer>
          <Button type="button" onClick={handleShowMore}>
            Show more
          </Button>
        </StyledPaginationContainer>
      )}
    </>
  );
};

export default Users;
