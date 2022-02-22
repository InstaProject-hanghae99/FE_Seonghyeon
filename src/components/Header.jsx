import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { deleteCookie, getCookie } from '../shared/cookie';
import { userState } from '../store/atom';
import styled from 'styled-components';
import { LogOut } from '@styled-icons/evaicons-solid/LogOut';
import { LogIn } from '@styled-icons/evaicons-solid/LogIn';
const Header = () => {
	const navigate = useNavigate();
	const [user, setUser] = useRecoilState(userState);
	useEffect(() => {
		const cookie = getCookie('login');
		if (cookie) {
			setUser({ ...user, isLogin: true });
		}
	}, []);

	const home = () => {
		navigate('/');
	};

	const logout = () => {
		deleteCookie('login');
		setUser({ isLogin: false, id: '', nickname: '' });
		navigate('/');
	};

	const login = () => {
		navigate('/login');
	};

	return (
		<StyledHeader>
			<Inner>
				<StyledLogo src='./logo.png' alt='로고' onClick={home} />
				{user.isLogin ? (
					<StyledLogOut onClick={logout}>로그아웃</StyledLogOut>
				) : (
					<StyledLogin onClick={login}>로그인</StyledLogin>
				)}
			</Inner>
		</StyledHeader>
	);
};

const StyledHeader = styled.div`
	height: 60px;
	background-color: #fff;
	display: flex;
	align-items: center;
	padding: 0 60px;
	border-bottom: 1px solid #ccc;
`;

const Inner = styled.div`
	width: 500px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0 auto;
`;

const StyledLogo = styled.img`
	margin-top: 5px;
	height: 30px;
	cursor: pointer;
`;

const StyledLogOut = styled(LogOut)`
	width: 30px;
	cursor: pointer;
`;

const StyledLogin = styled(LogIn)`
	width: 30px;
	cursor: pointer;
`;

export default Header;
