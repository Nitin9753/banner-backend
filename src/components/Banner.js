import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const Banner = ({ description, link, endTime }) => {

    console.log("the value of all the fields are: ", description, link, endTime);
    const [timeLeft, setTimeLeft] = useState(endTime - Date.now());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(endTime - Date.now());
        }, 1000);

        return () => clearInterval(timer);
    }, [endTime]);
    // console.log('the value of the is visible and the time left is: ', isVisible, " ", timeLeft);
    if (description === "" || description == null || link == null || timeLeft <= 0) {
        return ( <
            Box sx = {
                { padding: '20px', backgroundColor: 'skyblue', color: '#fff', textAlign: "center", fontWeight: "800", fontSize: "2rem" } } >
            Please Create a new Banner <
            /Box>
        )
    }

    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return ( <
        Box sx = {
            { padding: '20px', backgroundColor: '#3f51b5', color: '#fff' } } >
        <
        Typography variant = "h6" > { description } < /Typography>  <
        Typography variant = "body1" >
        Time left: { minutes }: { seconds < 10 ? '0' : '' } { seconds } <
        /Typography>  {
            link && ( <
                Button variant = "contained"
                href = { link }
                sx = {
                    { marginTop: '10px' } } >
                Learn More <
                /Button>
            )
        } <
        /Box>
    );
}
export default Banner