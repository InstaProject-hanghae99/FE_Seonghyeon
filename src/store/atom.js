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
	default: [],
});

