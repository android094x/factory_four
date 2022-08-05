import { useEffect } from 'react';
import styled from 'styled-components';

import { INTERVAL } from '../utils/constants';
import { formatDate } from '../utils/helpers';
import { useFetchApiName } from '../hooks/useFetchApiName';

interface IStatusPage {
  apiName: string;
}

const StatusPage = ({ apiName }: IStatusPage) => {
  const { counter, error, fetchStatus, setCounter, status } =
    useFetchApiName(apiName);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  useEffect(() => {
    const interval = setInterval(() => fetchStatus(), INTERVAL * 1000);

    return () => clearInterval(interval);
  }, [fetchStatus]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!error) {
      timeout = setTimeout(() => setCounter(counter - 1), 1000);
    }
    return () => clearTimeout(timeout);
  }, [counter, error, setCounter]);

  if (error) {
    return (
      <StyledStatusContainer isSuccess={!error}>
        <StatusBody>
          <h2>Error in {apiName}</h2>
          <p>Forbidden, try a different API NAME</p>
        </StatusBody>

        <StatusFooter>
          <span>An error has occurred D=</span>
        </StatusFooter>
      </StyledStatusContainer>
    );
  }

  if (!status) {
    return <div>Loading...</div>;
  }

  return (
    <StyledStatusContainer isSuccess>
      <StatusHeader>
        <h3>{status.hostname}</h3>
        {counter}
      </StatusHeader>

      <StatusBody>
        <h2>
          Hey {apiName} is {status.message}
        </h2>
      </StatusBody>

      <StatusFooter>
        <span>Status at {formatDate(status.time)}</span>
      </StatusFooter>
    </StyledStatusContainer>
  );
};

const StyledStatusContainer = styled.div<{ isSuccess: boolean }>`
  width: 100%;
  height: 100%;

  background-color: ${props => (props.isSuccess ? '#29a373' : '#ab3434')};
  color: white;
  display: flex;
  flex-direction: column;
`;

const StatusHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem 1.5rem;
  justify-content: space-between;
`;
const StatusBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StatusFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 0.5rem;
`;

export default StatusPage;
