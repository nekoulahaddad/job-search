import React,{useState} from 'react';
import {Card,Button,Collapse} from 'react-bootstrap';	
import ReactMarkdown from 'react-markdown';
function Job({job}) {
  const [open,setOpen] = useState(false);

  return (
	<Card>
	  <Card.Body>
	  	    <div className="d-flex justify-content-between">
		  	    <div>
		  	    	<Card.Title>
	    			{job.title} - <span className="text-muted font-weight-light">{job.company} </span>
	    			</Card.Title>
		  	    	<Card.Subtitle className="text-muted mb-2">
	    			{new Date(job.created_at).toLocaleDateString() /* to make the date look like 05/09/2020 -- note:toLocaleDateString() works with Date*/} 
	    			</Card.Subtitle>
	    			<span className="mr-2 bg-secondary rounded text-white pl-1 pr-1" >{job.type}</span>
	    			<span className="break-word bg-secondary rounded text-white pl-1 pr-1">
	    			{job.location}
	    			</span>
	    			<div style={{wordBreak:'break-all'}}>
	    				<ReactMarkdown source={job.how_to_apply} />
	    			</div>
	    			<Card.Text>
	    			<Button onClick={() => setOpen(!open)} variant={open ? "secondary":"primary"}>{open ? 'Hide Details':'View Details'}</Button>
	    			</Card.Text>
	    			<Collapse in={open}>
	    			<div className="mt-4">
	    				<ReactMarkdown source={job.description} /> {/* mark down is a plain text format*/}
	    			</div>
	    			</Collapse>	    			
	    		</div>
	    		<div>
	    		<img className="d-none d-md-block" height="50" alt={job.company} src={job.company_logo} />
	    		</div>
    		</div>
	  </Card.Body>
	</Card>

  );
}

export default Job;
 