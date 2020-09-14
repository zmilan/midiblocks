import Vue from 'vue'
import Vuex from 'vuex'
import {get, set, trimEnd} from 'lodash'
import axios from 'axios'
import localStorageAPI from '../assets/js/localstorage-api'

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
      /**
       * Represents the api
       */
      api: {
        domain: process.env.DEV ? 'http://midiblocks.local' : 'https://midiblocks.com',
        base: 'wp-json/midiblocks'
      },

      /**
       * User info
       */
      user: {
        isLoggedIn: false
      },

      /**
       * Post data
       */
      post: {
        isChecking: true
      },
      
      /**
       * Represents devices, categorized into inputs and outputs
       */
      devices: {
        /**
         * @see https://webmidijs.org/docs/v2.5.1/classes/Input.html#property_connection
         * @prop connection
         * @prop id
         * @prop manufactuerer
         * @prop name
         * @prop state
         * @prop type
         * 
         * @prop led {Boolean} True when a message is received, False a few frames later
         */
        inputs: {},
        outputs: {}
      }
    },

    getters: {
      endpoint: state => endpoint => {
        return trimEnd(state.api.domain, '/') + '/' + trimEnd(state.api.base, '/') + '/' + endpoint
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
      }
    },

    actions: {
      /**
       * GET data from storage, either from an API or localstorage
       * @param {*} param0 
       * @param {*} payload 
       */
      apiGet ({getters}, payload) {
        let path
        let params = {}
        
        if (typeof payload === 'string') {
          path = payload
        } else {
          path = payload.path
          delete payload.path
          params = payload
        }

        if (Vue.prototype.$q.config.storageMode === 'remote') {
          return axios.get(getters.endpoint(path), params)
        } else {
          return new Promise((resolve) => {
            path = path.replace(/\//g, '.')
            resolve({
              data: get(localStorageAPI.get, path)(params)
            })
          })
        }
      }
    }
  })

  return Store
}
