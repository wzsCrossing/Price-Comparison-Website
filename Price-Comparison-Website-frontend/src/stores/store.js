import { createStore } from "vuex";
import createVuexAlong from "vuex-along";

const store = createStore({
	state: {
		currentUser: '',
	},
	mutations: {
		setUser(state, user) {
			state.currentUser = user;
		},
		resetUser(state) {
			state.currentUser = '';
		},
	},
	plugins: [
		createVuexAlong({
			name: "vuex-along",
			local: { list: ["currentUser"] },
		})
	],
});

export default store;