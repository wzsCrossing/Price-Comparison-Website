import { createStore } from "vuex";
import createVuexAlong from "vuex-along";

const store = createStore({
	state: {
		currentUser: '',
		toQuery: '',
		selectIndex: '0',
		Commodities: [],
		select_JD: true,
		select_SN: true,
	},
	mutations: {
		setUser(state, user) {
			state.currentUser = user;
		},
		resetUser(state) {
			state.currentUser = '';
			state.toQuery = '';
			state.Commodities = [];
			state.select_JD = true;
			state.select_SN = true;
			state.selectIndex = '0';
		},
		setQuery(state, query) {
			state.toQuery = query;
		},
		setCommodities(state, commodities) {
			state.Commodities = commodities;
		},
		setSelectJD(state, select) {
			state.select_JD = select;
		},
		setSelectSN(state, select) {
			state.select_SN = select;
		},
		setSelectIndex(state, index) {
			state.selectIndex = index;
		},
	},
	plugins: [
		createVuexAlong({
			name: "vuex-along",
			local: { list: ["currentUser", "toQuery", "Commodities", "select_JD", "select_SN", "selectIndex"] },
		})
	],
});

export default store;