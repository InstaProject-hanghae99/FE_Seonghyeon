import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { postState, userState } from '../store/atom';
import styled from 'styled-components';
import { Heart } from '@styled-icons/bootstrap/Heart';
import { HeartFill } from '@styled-icons/bootstrap/HeartFill';

const Post = props => {
	const navigate = useNavigate();
	const [post, setPost] = useRecoilState(postState);
	const user = useRecoilValue(userState);

	const like = () => {
		if (!user.isLogin) {
			alert('로그인 한 사람만 좋아요 가능합니다.');
			navigate('/login');
			return;
		}
		const newState = post.map(p =>
			p.created_At === props.created_At
				? { ...p, likeCount: p.likeCount + 1, islike: !props.islike }
				: p
		);
		setPost(newState);
		// 요청 승인 시만
		localStorage.setItem('post', JSON.stringify(newState));
		console.log(props.islike);
	};

	const unlike = () => {
		if (!user.isLogin) {
			alert('로그인 한 사람만 좋아요 가능합니다.');
			navigate('/login');
			return;
		}
		const newState = post.map(p =>
			p.created_At === props.created_At
				? { ...p, likeCount: p.likeCount - 1, islike: !props.islike }
				: p
		);
		setPost(newState);
		localStorage.setItem('post', JSON.stringify(newState));
		console.log(props.islike);
	};
	return (
		<StyledPost>
			<PostHeader>
				<p>{props.nickname}</p>
			</PostHeader>
			<StyledImage src={props.image_url} alt='포스트 이미지' />
			<PostContents>
				{props.islike ? (
					<StyledHeartFill onClick={unlike} />
				) : (
					<StyledHeart onClick={like} />
				)}
				<p>{props.likeCount}명이 좋아합니다.</p>
				<p>{props.nickname} {props.content}</p>
				<PostTime>{parseInt((Date.now() - props.created_At) / 3600000)}시간 전</PostTime>
			</PostContents>
		</StyledPost>
	);
};

const StyledPost = styled.div`
	width: 500px;
	margin: 25px auto;
	background-color: #fff;
	border-radius: 3px;
	border: 1px solid #ccc;
`;

const PostHeader = styled.div`
	display: flex;
	align-items: center;
  height: 50px;
  padding: 0 20px;
`;

const StyledImage = styled.img`
	width: 100%;
`;

const PostContents = styled.div`
	padding: 15px;
  font-size: 13px;
  p {
    margin-top: 5px;
  }
`;

const StyledHeart = styled(Heart)`
	width: 20px;
	margin-bottom: 10px;
`;

const StyledHeartFill = styled(HeartFill)`
	width: 20px;
	color: #ed4956;
	margin-bottom: 10px;
`;

const PostTime = styled.p`
  color: #aaa;
  font-size: 10px
`

export default Post;
