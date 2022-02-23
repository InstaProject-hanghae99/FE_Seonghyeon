import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/atom';
import styled from 'styled-components';
import Input from '../elements/Input';
import Button from '../elements/Button';
import Image from '../components/Image'

const Write = () => {
	const navigate = useNavigate();
	const user = useRecoilValue(userState);
	const [url, setUrl] = useState('')
	const [inputs, setInputs] = useState({
		content: '',
		layout: 'left',
	});

	const onChange = e => {
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
		setTimeout(()=> {
			console.log(url)
		}, 1000)
	};

	const postWrite = () => {
		if (!user.isLogin || !user.nickname) {
			alert('로그인 한 사람만 글쓰기 가능합니다.');
			navigate('/login');
			return;
		}
		if (!url) {
			alert('이미지 업로드를 눌러주세요.');
			return
		}
		let prev = localStorage.getItem('post');
		let prevArr = [];
		if (prev) {
			prevArr = JSON.parse(prev);
		}
		prevArr.push({
			...inputs,
			created_At: Date.now(),
			likeCount: 0,
			nickname: user.nickname,
			islike: false,
			image_url: url,
		});
		console.log(prevArr)
		localStorage.setItem('post', JSON.stringify(prevArr));
		navigate('/');
	};

	return (
		<Container>
			<PageTitle>게시글 작성</PageTitle>
			<StyledSelect onChange={onChange} name = 'layout'>
				<option value='left'>left</option>
				<option value='right'>right</option>
				<option value='bottom'>bottom</option>
			</StyledSelect>
			<Image setUrl={setUrl} />
			<Input type='text' name='content' label='내용' _onChange={onChange} />
			<Button fullwidth _onClick={postWrite}>
				게시글 작성
			</Button>
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

const StyledSelect = styled.select`
	width: 300px;
	height: 50px;
	border: 2px solid #999;
	color: #999;
	font-size: 20px;
	font-weight: bold;
	text-align: center;
	border-radius: 3px;
	outline: none;
	margin-bottom: 50px;
`;

export default Write;
