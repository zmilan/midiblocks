import Vue from 'vue'
import Vuex from 'vuex'
import {set} from 'lodash'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      devices: {
        inputs: {},
        outputs: {}
      }
    },

    mutations: {
      /**
       * Helper for setting any state
       * @param {*} state 
       * @param {*} payload [stateId]
       */
      set (state, payload) {
        set(state, payload[0], payload[1])

        console.log(`🏪.${payload[0]} = `, payload[1])
      }
    }
  })

  return Store
}
