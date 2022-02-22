import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Button from '../elements/Button';
import Input from '../elements/Input';
import { setCookie } from '../shared/cookie';
import { userState } from '../store/atom';
import styled from 'styled-components';

const Login = () => {
	const navigate = useNavigate();
	const setUser = useSetRecoilState(userState);
	const [inputs, setInputs] = useState({
		id: '',
		password: '',
	});

	const onChange = e => {
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
	};

	const login = () => {
		const userData = JSON.parse(localStorage.getItem(inputs.id));
		if (userData) {
			const password = userData.password;
			if (password === inputs.password) {
				setCookie('login', inputs.id, 3);
				const { id, nickname } = userData;
				setUser({ isLogin: true, id, nickname });
				navigate('/');
			} else {
				alert('비밀번호가 틀렸습니다.');
			}
		} else {
			alert('아이디가 존재하지 않습니다.');
		}
	};

	const signup = () => {
		navigate('/signup');
	};

	return (
		<Container>
			<PageTitle>로그인</PageTitle>
			<Input
				type='text'
				name='id'
				label='아이디'
				value={inputs.id}
				_onChange={onChange}
			/>
			<Input
				type='password'
				label='비밀번호'
				name='password'
				value={inputs.password}
				_onChange={onChange}
			/>
			<Button fullwidth _onClick={login}>
				Login
			</Button>
			<Button fullwidth _onClick={signup}>Signup</Button>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	// 레이아웃 통일 방법 생각
	margin-top: 50px;
	h2,
	input {
		margin-bottom: 50px;
	}
	button {
		margin-bottom: 25px;
	}
`;

const PageTitle = styled.h2`
	font-weight: bold;
	font-size: 30px;
	color: #999;
`;

export default Login;
