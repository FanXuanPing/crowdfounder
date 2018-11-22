import Vue from 'vue'
import vuex from 'vuex'


import getters from "./getters"

import openprize from '@/store/modules/openprize.js'
Vue.use(vuex)
const store = new vuex.Store({
	modules:{
		openprize
	},
	getters
})

export default store;




