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
      // Used to force rerender a component by updating a :key set to this
      reloads: 0,
      
      /**
       * Represents the api
       */
      // @todo Remove this for now
      api: {
        domain: process.env.DEV ? 'http://midiblocks.local' : 'https://midiblocks.com',
        base: 'wp-json/midiblocks'
      },

      /**
       * Contains information about the last app-level event
       */
      lastEvent: {
        log: '',
        data: {}
      },

      /**
       * Contains a history of logs
       */
      eventLogs: {
        warn: [],
        error: []
      },

      /**
       * User info
       */
      // @todo Remove this for now
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
       * @param {*} payload ["path.to.state", value]
       */
      set (state, payload) {
        set(state, payload[0], payload[1])
      },

      /**
       * Helper for pushing a payload into an array
       * @param {*} state 
       * @param {*} payload ["path.to.state", value]
       */
      push (state, payload) {
        const data = get(state, payload[0])
        data.push(payload[1])
        set(state, payload[0], data)
      },

      /**
       * Helper for incrementing a state by 1
       * @param {*} state 
       * @param {String} path "path.to.state"
       */
      tally (state, path) {
        set(state, path, get(state, path) + 1)
      }
    },

    actions: {
      /**
       * GET data from storage, either from an API or localstorage
       * @todo remove
       * 
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
