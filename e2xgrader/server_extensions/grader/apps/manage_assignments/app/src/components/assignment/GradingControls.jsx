import React from 'react';

import Button from '@mui/material/Button';

const api = window.e2xAPI;
const pathJoin = window.pathJoin;

export default function GradingControls({ assignment }) {
    const [graders, setGraders] = React.useState([]);

    React.useEffect(() => {
        api.get_graders().then((graders) => {
            setGraders(graders);
        });
    }, []);

    return (
        <>
        {graders.map((grader) => {
          return (
            <Button href={pathJoin([window.base_url, grader[1]]) + "?assignment=" + assignment}>{grader[0]}</Button>
          );
        })}
        </>
    );
}