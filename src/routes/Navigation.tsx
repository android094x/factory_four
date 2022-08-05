import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';
import styled from 'styled-components';
import GeneralStatusPage from '../pages/GeneralStatusPage';
import StatusPage from '../pages/StatusPage';
import { API_NAMES } from '../utils/constants';

export const Navigation = () => {
  return (
    <BrowserRouter>
      <>
        <SideNav>
          <StyledUl>
            <li>
              <StyledNavLink to='/'>CHECK ALL STATUSES</StyledNavLink>
            </li>
            {Object.values(API_NAMES).map(value => (
              <li key={value}>
                <StyledNavLink to={`/${value}`}>
                  {value.toUpperCase()}
                </StyledNavLink>
              </li>
            ))}
          </StyledUl>
        </SideNav>

        <Routes>
          <Route path='/' element={<GeneralStatusPage />} />
          {Object.values(API_NAMES).map(value => (
            <Route
              key={value}
              path={`${value}`}
              element={<StatusPage apiName={value} />}
            />
          ))}

          <Route path='/*' element={<Navigate to={`/`} replace />} />
        </Routes>
      </>
    </BrowserRouter>
  );
};

const SideNav = styled.nav`
  background-color: #303140;
  height: 100%;
  width: 20vw;
  max-width: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledUl = styled.ul`
  list-style: none;
  li {
    margin-bottom: 1rem;
    text-align: center;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
`;
