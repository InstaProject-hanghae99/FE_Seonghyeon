import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../elements/Button';
import Input from '../elements/Input';

const Signup = () => {
	const navigate = useNavigate();
	const [inputs, setInputs] = useState({
		id: '',
		nickname: '',
		password: '',
		passwordCheck: '',
	});

	const signup = () => {
		// 검증 로직 추가 필요
		localStorage.setItem(
			inputs.id,
			JSON.stringify({
				id: inputs.id,
				nickname: inputs.nickname,
				password: inputs.password,
			})
		);
		navigate('/login');
	};

	const onChange = e => {
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
	};

	return (
		<Container>
			<PageTitle>회원가입</PageTitle>
			<Input
				type='text'
				label='아이디'
				name='id'
				value={inputs.id}
				_onChange={onChange}
			/>
			<Input
				type='text'
				label='닉네임'
				name='nickname'
				value={inputs.nickname}
				_onChange={onChange}
			/>
			<Input
				type='password'
				label='비밀번호'
				name='password'
				value={inputs.password}
				_onChange={onChange}
			/>
			<Input
				type='password'
				label='비밀번호 확인'
				name='passwordCheck'
				value={inputs.passwordCheck}
				_onChange={onChange}
			/>
			<Button fullwidth _onClick={signup}>회원가입</Button>
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
`;

const PageTitle = styled.h2`
	font-weight: bold;
	font-size: 30px;
	color: #999;
`;

export default Signup;
