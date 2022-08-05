import { Navigation } from './routes/Navigation';
import styled from 'styled-components';

const Container = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
`;

function App() {
  return (
    <Container>
      <Navigation />
    </Container>
  );
}

export default App;
