import React,{useState} from 'react';
import './App.css';
import useFetchJobs from './useFetchJobs';
import Job from './Job';
import JobPage from './JobPage';
import SearchFrom from './SearchFrom';
import {Container} from 'react-bootstrap';

function App() {
const [params,setParams] = useState({});
const [page,setPage] = useState(1);
const {jobs,loading,error,hasNextPage} = useFetchJobs(params, page);


	function handleParamChange(e) {
		const param = e.target.name 
		const value = e.target.value
		setPage(1)
		setParams(prevParams => {
			return {...prevParams,[param]:value}
		})
	}



  return (
    <div className="App">
	    <Container>
	    <div className="mt-4 mb-4 d-flex justify-content-center border-bottom">
	    	<h1 className="mb-4 text-primary">Job App</h1>
	    </div>
	    	<SearchFrom params={params} handleParamChange={handleParamChange} />
	    	{loading && <h1>loading...</h1>}
	    	{error && <h1>Error. Refresh page please...</h1>}
	    	<JobPage page={page} setPage={setPage} hasNextPage={hasNextPage} />
	    	{!loading && !error &&
	    		jobs.map(job => (
	    			<Job key={job.id} job={job}  />
	    			))	    		
	    	}
		</Container>
    </div>
  );
}

export default App;
 