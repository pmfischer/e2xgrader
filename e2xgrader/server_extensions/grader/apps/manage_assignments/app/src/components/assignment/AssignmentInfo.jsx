import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
/**
 * If release path is null -> You have to generate the student version first
 * If num_submission > 0   -> You can grade
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * */

const ExchangeWarning = () => {
  let warning = '';
  let nbgrader_link = (
    <Link 
      rel="noreferrer"
      href="https://nbgrader.readthedocs.io/en/stable/user_guide/managing_assignment_files.html#setting-up-the-exchange"
    >
      Setting up the Exchange
    </Link>
  );
  if (window.windows) {
    warning = (<>
                 Windows operating system detected. Please note that the "release" and "collect"
                 functionality will not be available.
               </>);
  } else if (window.exchange_is_missing) {
    warning = (<>
                 The exchange directory does not exist and could not be created.
                 The "release" and "collect" functionality will not be available.
                 Please see the documentation on {nbgrader_link} for instructions.
               </>);
  } else if (window.course_id === "") {
    warning = (<>
                 The course id has not been set in <code>nbgrader_config.py</code>.
                 The "release" and "collect" functionality will not be available.
                 Please see the documentation on {nbgrader_link} for instructions.
               </>);
  }

  return (
    <>
    {warning !== "" ? 
      <Alert severity="error">
        <AlertTitle>Exchange is not working!</AlertTitle>
        {warning}
      </Alert> : <></>}
    </>
  );  
}

export default function AssignmentInfo(props) {
  let info;

  if (props.notebooks.length < 1) {
    info = (<>
              You have not added any worksheets to the assignment yet. <br/>
              <strong>Head over to the worksheets tab to create one!</strong>
            </>)
  } else if (props.status === 'draft' && props.num_submissions > 0) {
    info = (<>
              Your assignment is currently unreleased and has {props.num_submissions} submissions. <br/>
              <strong>Head over to the submissions & grades tab to collect and grade submissions.</strong>
            </>)
  } else if (props.release_path === null) {
    info = (<>
              You have not created a student version of the assignment yet. <br/>
              <strong>Head over to the worksheets tab to generate it!</strong>
            </>)
  } else if (props.status === 'released') {
    info = (<>
              Your assignment is currently released and has {props.num_submissions} submissions. <br/>
              <strong>Head over to the submissions & grades tab to collect and grade submissions.</strong>
            </>)
  } else if (props.num_submissions > 0) {
    info = (<>
              The assignment has been returned and currently has {props.num_submissions} submissions. <br/>
              <strong>Head over to the submissions & grades tab to collect and grade submissions.</strong>
            </>)
  } else if (props.num_submissions < 1 && props.releaseable) {
    info = <>Your assignment is currently in draft status. Release your assignment to make it available to students.</>
  } else {
    info = <>Nothing to do?</>
  }

  return (
    <Stack spacing={1}>
      <ExchangeWarning/>
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        {info}
      </Alert>
    </Stack>
  );
}