import { createStore } from 'vuex';

export default createStore({
    state: { //모듈 상태 정의
		userId: '',
		username: '',
		token: '',
	},
	mutations: { //모듈의 상태를 변경하는 동기적 메서드 정의
		setUserId(state, userId){
			state.userId = userId;
		},
		setUserNm(state, username){
			state.username = username;
		},
		setToken(state, token){
			state.token = token;
		},
	},
	actions: { //호출로 상태가 변경되는 비동기적 메서드 정의
		//여러 mutation을 연달아 호출하는 작업 등을 수행
		// async Login({ commit }, userData){
		// 	const { data } = await LoginUser(userData);
		// }
	},
	getters: { //상태를 조회/가공하여 새로운 값 반환
		isLogin(state){
			return state.token != '';
		}
	},
});