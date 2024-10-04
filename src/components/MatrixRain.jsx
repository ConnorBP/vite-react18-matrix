import React, { useEffect, useRef, useState } from "react";
import './MatrixRain.css';


// check media queries from js to help with accessibility of the page
function isMotionAllowed() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
}

function isDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function initDrops(width, font_size) {
    // if (isMotionAllowed()) {
        // no motion preference
        let columns = Math.floor(width / font_size);
        return Array(columns).fill(1);
    // } else {
        // does not want motion
    // }
}

const MatrixRain = (props) => {
    const canvasRef = useRef(null);
    const colorRef = useRef(props.color);
    // update color on change
    useEffect(() => {
        colorRef.current = props.color;
    },
    [props.color]);

    // on load useEffect hook
    useEffect(() => {
        const c = canvasRef.current;

        // Check if the canvas is available
        if (!c) {
            console.error("Canvas not found!");
            return;
        }

        const ctx = c.getContext("2d");

        // Matrix characters, converted into char array by split
        let matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("");

        const font_size = 10;
        let drops = initDrops(c.width, font_size);

        // cinema framerate teehee
        let frameRate = 23.976;

        // hook media queries
        const color_scheme_query = window.matchMedia('(prefers-color-scheme: dark)');
        const motion_query = window.matchMedia('(prefers-reduced-motion: no-preference)');

        let IS_DARK_MODE = isDarkMode();
        const darkModeChanged = (event) => {
            IS_DARK_MODE = event.matches;
            if(!isMotionAllowed()) {
                generateStaticFrame();
            }
        };
        color_scheme_query.addEventListener('change', darkModeChanged);


        const draw = (shouldOutput) => {
            // Black background for the canvas with slight opacity for the trail effect
            if(IS_DARK_MODE) {
                ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
            } else {
                ctx.fillStyle = "rgba(200, 200, 200, 0.04)";
            }
            ctx.fillRect(0, 0, c.width, c.height);

            // Color for the text
            ctx.fillStyle = colorRef.current;
            ctx.font = `${font_size}px arial`;

            // Loop through the columns of the matrix
            for (let i = 0; i < drops.length; i++) {
                const text = matrix[Math.floor(Math.random() * matrix.length)];
                if(shouldOutput) ctx.fillText(text, i * font_size, drops[i] * font_size);

                // Reset the drop to the top randomly
                if (drops[i] * font_size > c.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const generateStaticFrame = () => {
            for(let i=0;i<100;i++) {
                draw(true);
            }
            draw(true);
        };

        // Set canvas to full screen
        const setCanvasSize = () => {
            c.width = window.innerWidth;
            c.height = window.innerHeight;
            drops = initDrops(c.width, font_size);
            if(!isMotionAllowed()) {
                generateStaticFrame();
            }
        };

        // Set canvas size initially and on resize
        setCanvasSize();
        window.addEventListener("resize", setCanvasSize);

        let interval = null;
        if(isMotionAllowed()) {
            // spawn the render thread on an interval
            interval = setInterval(draw, Math.floor(1000 / frameRate), true);
        } else {
            // if no motion is allowed then we will pre-render some frames to make the bg
            generateStaticFrame();
        }

        // Cleanup
        return () => {
            // console.info("cleaning up matrix test123");
            // on page reload or change to a view without a matrix component
            // we remove the interval and the event listener
            // as to not leave stray ones or doubled ones
            if(interval!=null) clearInterval(interval);
            window.removeEventListener("resize", setCanvasSize);
            color_scheme_query.removeEventListener('change', darkModeChanged)
        };
    },
        // pass an empty useHook dependency list [] so that this only runs on startup 
        []
    );

    return <canvas className="matrix" ref={canvasRef}></canvas>;
};

export default MatrixRain;
