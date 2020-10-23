import axios from 'axios';
import {useReducer,useEffect} from 'react';
import {MAKE_REQUEST,GET_DATA,ERROR,HAS_NEXT_PAGE} from './Actions'


//step-1 --> put the link of the rest API 
const jobUrl = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";

//step-2 initilize a state
const initialState = {
jobs:[],
loading:false,
error:false,
hasNextPage:true
}

//step-3 --> make a reducer to use the rest api in all components
function reducer(state,action){
	switch(action.type){
		case MAKE_REQUEST:
			return {loading:true,jobs:[]}
		case GET_DATA:
			return {...state,loading:false,jobs:action.payload.jobs}
		case ERROR:
			return {...state,loading:false,error:action.payload.error,jobs:[]}
		case HAS_NEXT_PAGE:
			return {...state,loading:false,hasNextPage:action.payload.hasNextPage}
		default:
		return state
	}
}



//step-4 initilize a state
export default function useFetchJobs(params,page){

 const [state,dispatch] = useReducer(reducer,initialState)

 useEffect(()=>{
 	const cancelToken1 = axios.CancelToken.source(); // it used to cancel the request, cuz while using th filters(place of the job,type of job, etc) i don't need to make a request every time i type a letter 
 	dispatch({type:MAKE_REQUEST}) // first of all make a request so give me the loading state
 	axios.get(jobUrl,{
 		cancelToken:cancelToken1.token,
 		params:{markdown:true,page:page,...params}
 	}).then(res => {
 		dispatch({type:GET_DATA,payload:{jobs:res.data}})
 	}).catch(err => {
 		if(axios.isCancel(err)) return // it used to ignore the errors the Happened because of cancelling the request
 		dispatch({type:ERROR,payload:{error:err}})
 	})
 	const cancelToken2 = axios.CancelToken.source();
 	axios.get(jobUrl,{
 		cancelToken:cancelToken2.token,
 		params:{markdown:true,page:page + 1,...params}
 	}).then(res => {
 		dispatch({type:HAS_NEXT_PAGE,payload:{hasNextPage:res.data.length !== 0 }})
 	}).catch(err => {
 		if(axios.isCancel(err)) return // it used to ignore the errors the Happened because of cancelling the request
 		dispatch({type:ERROR,payload:{error:err}})
 	})

 	return () => {
 		cancelToken1.cancel() // here i am cancelling the request
 		cancelToken2.cancel()
 	}
 },[params,page]) // if the component did mount, the page or the params(filters) have changed make this function
 

 return state

}