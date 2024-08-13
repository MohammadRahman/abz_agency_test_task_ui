import styled from 'styled-components';

export type UserListProps = {
  id: number;
  name: string;
  email: string;
  position_id: number;
  photo: string;
};
const StyledList = styled.li`
  border: 1px solid var(--color-grey-100);
  padding: 0.5rem;
  display: flex;
  background-color: white;
  border-radius: 8px;
`;
const StyledPhoto = styled.div`
  width: 75px;
  height: 75px;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: inset 1px solid var(--color-grey-50);
  /* padding: 1rem; */
`;
const StyledUserInfo = styled.div`
  width: 60%;
  padding: 1rem;
`;
const StyledImg = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`;
const UserList = ({ id, name, email, position_id, photo }: UserListProps) => {
  console.log({ id, name, email, position_id, photo });
  return (
    <StyledList key={id}>
      <StyledPhoto>
        <StyledImg style={{ backgroundImage: `url(${photo})` }} />
      </StyledPhoto>
      <StyledUserInfo>
        <h4>{name}</h4>
        <span style={{ display: 'block' }}>{email}</span>
        <span>PositionId: {position_id}</span>
      </StyledUserInfo>
    </StyledList>
  );
};

export default UserList;
