import styled from 'styled-components';
import Button from '../button/Button';
import { Modal } from '../modal/Modal';
import CreateUserForm from '../../features/user/CreateUserForm';
import { usetoken } from '../../features/token/useToken';
import { useEffect, useState } from 'react';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

function Header() {
  const [fetchToken, setFetchToken] = useState(false);
  const { token, isFetched } = usetoken(fetchToken);

  console.log(token, isFetched);

  useEffect(() => {
    if (isFetched) {
      setFetchToken(false);
    }
  }, [isFetched, fetchToken]);

  return (
    <StyledHeader>
      <Button onClick={() => setFetchToken(true)}>Request Token</Button>
      <Modal>
        <Modal.Open opens="add-user">
          <Button variation="outlinePrimary">Add User</Button>
        </Modal.Open>
        <Modal.Window name="add-user">
          <CreateUserForm />
        </Modal.Window>
      </Modal>
    </StyledHeader>
  );
}

export default Header;
