import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import GameBodyStyles from './GameBody.module.css';
import burger from '../../assets/burger.svg';
import useAnimationFrame from '../../uitls/useAnimationFrame';


class Queue {
    data = [];
    add = (record) => {
        this.data.unshift(record);
    }
    remove = () => {
        return this.data.pop();
    }
    last = () => {
        return this.data[this.data.length - 1];
    }
    size = () => {
        return this.data.length;
    }
    first = () => {
        return this.data[0];
    }
}


function GameBody(props) {

    let [x, setX] = useState(props.x);
    let [y, setY] = useState(props.y);

    let [xSnake, setXSnake] = useState(props.xSnake);
    let [ySnake, setYSnake] = useState(props.ySnake);


    // uncomment below line to use keystrokes

    // const eventRef = useRef();

    const eventXRef = useRef();
    const eventYRef = useRef();
    const canvasRef = useRef();
    const ctxRef = useRef();
    const foodRef = useRef();
    const snakesRef = new Array(xSnake.length).fill(useRef());

    const mouseMoveHandler = (event) => {
        const xPos = event.clientX;
        const yPos = event.clientY;
        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;
        eventXRef.current = parseInt((xPos - rect.left) * scaleX, 10);
        eventYRef.current = parseInt((yPos - rect.top) * scaleY, 10);
    }
    useEffect(() => {
        window.addEventListener('mousemove', mouseMoveHandler, false);
        canvasRef.current = document.getElementById('game');
        ctxRef.current = canvasRef.current.getContext('2d');
        foodRef.current = new Image();
        snakesRef.forEach(el => {
            el.current = new Image();
        });


        foodRef.current.onload = () => {
            ctxRef.current.clearRect(0, 0, props.width, props.height);
            ctxRef.current.drawImage(foodRef.current, x, y, 20, 20);
            snakesRef.forEach((el, i) => {
                ctxRef.current.drawImage(el.current, xSnake[i], ySnake[i], 50, 50);
            });
        }

        foodRef.current.src = burger;
        snakesRef.forEach(el => {
            el.current.src = burger;
        })


        // uncomment below lines to use keystrokes

        // window.addEventListener('keydown', (event) => {
        //     const direction = event.key;
        //     eventRef.current = direction;
        // }, false);
    }, [])

    useAnimationFrame((time) => {


        // uncomment below line to use keystrokes

        // const direction = eventRef.current;


        // Food Movement, un-comment below to use key strokes
        // const foodMove = (direction) => {
        //     if (direction === 'ArrowUp') {
        //         if (y <= 0) {
        //             setY(y = props.height);
        //         } else {
        //             setY(--y);
        //         }
        //     } else if (direction === 'ArrowRight') {
        //         if (x >= props.width) {
        //             setX(x = 0);
        //         } else {
        //             setX(++x);
        //         }
        //     } else if (direction === 'ArrowLeft') {
        //         if (x <= 0) {
        //             setX(x = props.width);
        //         } else {
        //             setX(--x);
        //         }
        //     } else if (direction === 'ArrowDown') {
        //         if (y >= props.height) {
        //             setY(y = 0);
        //         } else {
        //             setY(++y);
        //         }
        //     } else {
        //         return;
        //     }
        // }

        // comment below two lines to use keystrokes

        setX(x = eventXRef.current);
        setY(y = eventYRef.current);

        // Snake Movement
        const snakeMove = () => {
            // if (y > (props.height / 2)) {
            //     return;
            // }
            const snakeXCopy = xSnake.slice(0)
            const snakeYCopy = ySnake.slice(0);
            if (snakeXCopy.length !== snakeYCopy.length) {
                return;
            }
            snakeXCopy.forEach((_, i) => {
                let xDist = x - snakeXCopy[i];
                let yDist = y - snakeYCopy[i];

                if (yDist > 0) {
                    snakeYCopy[i] += props.speed;
                } else if (yDist < 0) {
                    snakeYCopy[i] -= props.speed;
                }
                if (xDist > 0) {
                    snakeXCopy[i] += props.speed;

                } else if (xDist < 0) {
                    snakeXCopy[i] -= props.speed;
                }
            });
            setXSnake(snakeXCopy);
            setYSnake(snakeYCopy);
        }

        // uncomment below to use keystrokes

        // foodMove(direction);

        const gameOver = () => {
            const snakeXCopy = xSnake.slice(0)
            const snakeYCopy = ySnake.slice(0);
            if (snakeXCopy.length !== snakeYCopy.length) {
                return;
            }
            snakeXCopy.forEach((el, i) => {
                if (Math.abs(x - snakeXCopy[i]) <= props.deltaMismatch && Math.abs(y - snakeYCopy[i]) <= props.deltaMismatch) {
                    ctxRef.current.clearRect(0, 0, props.width, props.height);
                    ctxRef.current.fillText("Game Over!", props.width / 2, props.height / 2);
                    window.removeEventListener('mousemove', mouseMoveHandler);
                    return;
                }
            })
        }

        const draw = () => {
            ctxRef.current.clearRect(0, 0, props.width, props.height);
            ctxRef.current.drawImage(foodRef.current, x, y, 20, 20);
            snakesRef.forEach((el, i) => {
                ctxRef.current.drawImage(el.current, xSnake[i], ySnake[i], 50, 50);
            });
        }

        gameOver();
        snakeMove();
        draw();
    });


    return (
        <>
            <canvas id="game" width={props.width} height={props.height} className={GameBodyStyles.container}>
                Your browser does not support the HTML5 canvas tag.
            </canvas>
            <button className={GameBodyStyles.container}>Click to Start!!!</button>
        </>
    )
}

GameBody.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    speed: PropTypes.number,
    deltaMismatch: PropTypes.number,
    separatingDistance: PropTypes.number,
    xSnake: PropTypes.array,
    ySnake: PropTypes.array
};

GameBody.defaultProps = {
    width: 600,
    height: 600,
    speed: 4,
    deltaMismatch: 5,
    separatingDistance: 20,
    xSnake: [],
    ySnake: []
};

export default GameBody;
