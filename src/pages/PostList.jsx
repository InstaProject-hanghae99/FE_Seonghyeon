import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Post from '../components/Post';
import { postState, userState } from '../store/atom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const Main = () => {
	const navigate = useNavigate()
	const [post, setPost] = useRecoilState(postState);
	const [user, setUser] = useRecoilState(userState)


	const fetchData = async () => {
		const storageData = localStorage.getItem('post');
		if (storageData) {
			const convertedData = await JSON.parse(storageData);
			setPost(convertedData);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const write = () => {
		navigate('/write');
	};

	return (
		<>
			{user.isLogin ? <PostButton onClick={write}>+</PostButton> : null}
			{post ? post.map((p, index) => <Post key={index} {...p} />) : null}
		</>
	);
};

const PostButton = styled.button`
	position: fixed;
	bottom: 100px;
	right: 100px;
	border-radius: 50%;
	width: 80px;
	height: 80px;
	border: none;
	background-color: #fff;
	box-shadow: 10px 10px 10px #ccc;
	font-size: 60px;
	color: #ccc;
	&:hover {
    background-color: #eee;
    color: #fff;
  }
  &:active {
    background-color: #fff;
    color: #bbb;
  }
`;

export default Main;
