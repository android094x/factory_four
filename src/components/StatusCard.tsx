import { useEffect } from 'react';
import styled from 'styled-components';
import { useFetchApiName } from '../hooks/useFetchApiName';
import { INTERVAL } from '../utils/constants';
import { formatDate } from '../utils/helpers';

interface IStatusCard {
  apiName: string;
}

export const StatusCard = ({ apiName }: IStatusCard) => {
  const { fetchStatus, status } = useFetchApiName(apiName);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  useEffect(() => {
    const interval = setInterval(() => fetchStatus(), INTERVAL * 1000);

    return () => clearInterval(interval);
  }, [fetchStatus]);

  if (!status) {
    return (
      <StyledStatusCard isSuccess={!!status}>
        <h3>{apiName.toUpperCase()}</h3>
        <p className='status'>An error has occurred</p>
        <p>Forbidden status</p>
      </StyledStatusCard>
    );
  }

  return (
    <StyledStatusCard isSuccess>
      <h3>{apiName.toUpperCase()}</h3>
      <p className='status'>{status.message}</p>
      <div>
        <p>{status.hostname}</p>
        <p>{formatDate(status.time)}</p>
      </div>
    </StyledStatusCard>
  );
};

const StyledStatusCard = styled.div<{ isSuccess: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 2rem 0;
  border-radius: 0.8rem;
  background-color: white;

  .status {
    width: 100%;
    text-align: center;
    padding: 1rem 0;
    background-color: ${props => (props.isSuccess ? '#29a373' : '#ab3434')};
    color: white;
  }
`;
