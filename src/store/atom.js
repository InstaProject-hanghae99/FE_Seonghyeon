import { atom } from 'recoil';

export const userState = atom({
	key: 'userState',
	default: {
		isLogin: false,
		id: '',
		nickname: '',
	},
});

export const postState = atom({
	key: 'postState',
	default: [
		{
			content: 'asd',
			layout: 'bottom',
			created_At: 1645621750981,
			likeCount: 0,
			nickname: '유저이름',
			islike: false,
			image_url:
				'https://my-magazine-shine7329.s3.ap-northeast-2.amazonaws.com/upload/KakaoTalk_20220223_110653768_01.jpg',
		},
		{
			content: 'asdsa',
			layout: 'right',
			created_At: 1645621800428,
			likeCount: 1,
			nickname: 'nickname',
			islike: true,
			image_url:
				'https://my-magazine-shine7329.s3.ap-northeast-2.amazonaws.com/upload/KakaoTalk_20220223_110653768_01.jpg',
		},
		{
			content: 'asdsad',
			layout: 'left',
			created_At: 1645628232107,
			likeCount: 0,
			nickname: 'nickname',
			islike: false,
			image_url:
				'https://my-magazine-shine7329.s3.ap-northeast-2.amazonaws.com/upload/KakaoTalk_20220223_111915172.png',
		},
		{
			content: 'dsadsa',
			layout: 'bottom',
			created_At: 1645628302144,
			likeCount: 0,
			nickname: 'nickname',
			islike: false,
			image_url:
				'https://my-magazine-shine7329.s3.ap-northeast-2.amazonaws.com/upload/KakaoTalk_20220223_111915172.png',
		},
	],
});
