import { RecoilRoot } from 'recoil';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import styled from 'styled-components';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PostList from './pages/PostList';
import Write from './pages/Write'

const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body {
    height: 100%;
    background-color: #eee;
		box-sizing: border-box;
  }
`;

function App() {
	return (
		<RecoilRoot>
			<GlobalStyle />
			<Header />
			<Routes>
				<Route path='/' element={<PostList />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/write' element={<Write />} />
			</Routes>
		</RecoilRoot>
	);
}

export default App;

const StyledContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
