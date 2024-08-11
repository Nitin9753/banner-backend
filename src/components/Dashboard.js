import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Switch, Typography, minor } from '@mui/material';
import axios from 'axios';
import Banner from './Banner';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Dashboard = () => {
        const [bannerData, setBannerData] = useState({
            description: "",
            link: "",
            endTime: Date.now(),
        });

        // Fetch banner data on initial load and when it gets updated (controlled by 'reload' state)
        useEffect(() => {
            axios.get('https://banner-takeuforward-backend.onrender.com/api/banner').then((response) => {
                if (response && response.data) {
                    const { description, link, timer } = response.data;
                    setBannerData({
                        description,
                        link,
                        endTime: Date.now() + timer * 1000,
                    });
                    console.log("the value of the description link timer is: ", bannerData);
                }
            });
        }, []);

        const [description, setDescription] = useState('');
        const [link, setLink] = useState('');
        const [timer, setTimer] = useState(); // Default timer is 60 seconds
        const [isVisible, setIsVisible] = useState(true);



        const handleSave = () => {
            // Save banner data to the server
            if (!description || description == "" || !timer || timer == "") {
                toast.error('Please Enter all fields', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            } else {

                axios.post('https://banner-takeuforward-backend.onrender.com/api/banner', {
                    description,
                    link,
                    timer,
                }).then(() => {
                    // Update the bannerData state with the new data immediately
                    setBannerData({
                        description,
                        link,
                        endTime: Date.now() + timer * 1000,
                    });
                    toast.success('🦄 Wow so easy!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                });
            }
        };

        return ( <
            >
            <
            ToastContainer containerId = "container1"
            position = "top-right"
            autoClose = { 5000 }
            hideProgressBar = { false }
            newestOnTop = { false }
            closeOnClick rtl = { false }
            pauseOnFocusLoss draggable pauseOnHover theme = "light"
            transition = { Bounce }
            limit = { 1 }
            /> { /* Same as */ } <
            ToastContainer / >

            {!isVisible ? "" : < Banner {...bannerData }
                />} <
                Box sx = {
                    { padding: '20px', width: "50%", margin: "auto" } } >
                <
                Box sx = {
                    { textAlign: "center", marginTop: "1rem" } } >

                <
                Typography variant = "h5"
                gutterBottom >
                Dashboard <
                /Typography> <
                /Box> <
                Switch sx = {
                    { margin: "10px 0px 10px 0px" } }
                checked = { isVisible }
                onChange = {
                    (e) => setIsVisible(e.target.checked) }
                inputProps = {
                    { 'aria-label': 'controlled' } }
                /> { isVisible ? "Hide Banner" : "Display Banner" } <
                TextField
                label = "Banner Description"
                value = { description }
                onChange = {
                    (e) => setDescription(e.target.value) }
                fullWidth
                sx = {
                    { marginBottom: '10px' } }
                /> <
                TextField
                label = "Banner Link"
                value = { link }
                onChange = {
                    (e) => setLink(e.target.value) }
                fullWidth
                sx = {
                    { marginBottom: '10px' } }
                /> <
                TextField
                label = "Banner Timer (seconds)"
                type = "number"
                value = { timer }
                onChange = {
                    (e) => setTimer(Number(e.target.value)) }
                fullWidth
                sx = {
                    { marginBottom: '10px' } }
                /> <
                Button sx = {
                    { width: "50%", margin: "1rem auto", display: "block" } }
                variant = "contained"
                onClick = { handleSave } >
                Save <
                /Button> <
                /Box> <
                />
            );
        };

        export default Dashboard;