import styled from 'styled-components';
import { StatusCard } from '../components/StatusCard';
import { API_NAMES } from '../utils/constants';

const GeneralStatusPage = () => {
  return (
    <StyledGeneralStatus>
      {Object.values(API_NAMES).map(value => (
        <StatusCard apiName={value} />
      ))}
    </StyledGeneralStatus>
  );
};

const StyledGeneralStatus = styled.div`
  width: 100%;
  overflow: auto;
  background-color: #94959c;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
`;

export default GeneralStatusPage;
