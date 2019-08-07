import { useReducer } from 'react'

interface Action {
  type: string,
  payload: object,
  mutations: object
}

function reducer(state: object, { type, payload, mutations }: Action) {
  return mutations[type](state, payload)
}

export const useRedux = (model: string) => {
  const { state, actions, mutations } = require(`../store/model/${model}`);

  const [data, dispatch] = useReducer(reducer, state);

  const commit = ({ type, payload }: any) => {
    dispatch({
      type,
      payload,
      mutations
    })
  };

  const make = ({type,payload}:any)=>{
    if(actions[type]){
      actions[type](payload,commit)
    }else if(mutations[type]){
      commit({type,payload})
    }
  }

  return [data,make]
}