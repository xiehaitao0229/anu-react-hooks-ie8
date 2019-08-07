import axios from 'axios';

const fetch = (params:any)=>{
  return new Promise((resolve,reject)=>{
    axios(params)
      .then(res=>{
        resolve(res.data)
      })
      .catch(err=>{
        reject(err.data)
      })
  })
}

export default fetch;