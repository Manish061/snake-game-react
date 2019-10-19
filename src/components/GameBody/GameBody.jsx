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
    // let [x, setX] = useState(parseInt(Math.random() * (props.width - 70)), 10);
    // let [y, setY] = useState(parseInt(Math.random() * (props.height - 70)), 10);

    let [x, setX] = useState(150);
    let [y, setY] = useState(150);

    // let [xSnake, setXSnake] = useState(parseInt(Math.random() * (props.width - 70)), 10);
    // let [ySnake, setYSnake] = useState(parseInt(Math.random() * (props.height - 70)), 10);

    let [xSnake, setXSnake] = useState(20);
    let [ySnake, setYSnake] = useState(30);

    // let [xSnake2, setXSnake2] = useState(parseInt(Math.random() * (props.width - 70)), 10);
    // let [ySnake2, setYSnake2] = useState(parseInt(Math.random() * (props.height - 70)), 10);

    let [xSnake2, setXSnake2] = useState(480);
    let [ySnake2, setYSnake2] = useState(490);

    // uncomment below line to use keystrokes

    // const eventRef = useRef();

    const eventXRef = useRef();
    const eventYRef = useRef();

    useEffect(() => {
        window.addEventListener('mousemove', (event) => {
            const xPos = event.clientX;
            const yPos = event.clientY;
            eventXRef.current = xPos;
            eventYRef.current = yPos;
        }, false);


        // uncomment below lines to use keystrokes

        // window.addEventListener('keydown', (event) => {
        //     const direction = event.key;
        //     eventRef.current = direction;
        // }, false);
    }, [])

    useAnimationFrame((time) => {
        const canvas = document.getElementById('game');
        const ctx = canvas.getContext('2d');
        const food = new Image();
        const snake = new Image();
        const snake2 = new Image();


        // uncomment below line to use keystrokes

        // const direction = eventRef.current;


        // Food Movement
        const foodMove = (direction) => {
            if (direction === 'ArrowUp') {
                if (y <= 0) {
                    setY(y = props.height);
                } else {
                    setY(--y);
                }
            } else if (direction === 'ArrowRight') {
                if (x >= props.width) {
                    setX(x = 0);
                } else {
                    setX(++x);
                }
            } else if (direction === 'ArrowLeft') {
                if (x <= 0) {
                    setX(x = props.width);
                } else {
                    setX(--x);
                }
            } else if (direction === 'ArrowDown') {
                if (y >= props.height) {
                    setY(y = 0);
                } else {
                    setY(++y);
                }
            } else {
                return;
            }
        }

        // comment below two lines to use keystrokes

        setX(x = eventXRef.current);
        setX(y = eventYRef.current);

        // Snake 1 Movement
        const snakeOneMove = () => {
            if (xSnake === x && ySnake === y) {
                window.cancelAnimationFrame(time);
                return;
            } else if (xSnake === x) {
                if (y > ySnake) {
                    setYSnake(++ySnake)
                } else {
                    setYSnake(--ySnake)
                }
            } else if (ySnake === y) {
                if (x > xSnake) {
                    setXSnake(++xSnake)
                } else {
                    setXSnake(--xSnake)
                }
            } else {
                let xDist = x - xSnake;
                let yDist = y - ySnake;
                if (xDist > 0) {
                    if (yDist > 0) {
                        setXSnake(++xSnake);
                        setYSnake(++ySnake);
                    } else {
                        setXSnake(++xSnake);
                        setYSnake(--ySnake);
                    }
                } else {
                    if (yDist > 0) {
                        setXSnake(--xSnake);
                        setYSnake(++ySnake);
                    } else {
                        setXSnake(--xSnake);
                        setYSnake(--ySnake);
                    }
                }
            }

            // if (xSnake === xSnake2) {
            //     if (xSnake === 0) {
            //         setXSnake2(++xSnake2)
            //     } else if (xSnake === props.width) {
            //         setXSnake(--xSnake);
            //     } else {
            //         setXSnake(--xSnake);
            //     }
            // } else if (ySnake === ySnake2) {
            //     if (ySnake === 0) {
            //         setYSnake2(++ySnake2)
            //     } else if (ySnake === props.height) {
            //         setYSnake(--ySnake);
            //     } else {
            //         setYSnake(--ySnake);
            //     }
            // }
        }

        // Snake 2 Movement
        const snakeTwoMove = () => {
            // const xSnakeDist = Math.abs(xSnake - xSnake2);
            // const ySnakeDist = Math.abs(ySnake - ySnake2);

            // if(xSnakeDist <= 70 || ySnakeDist <= 70) {
            //     return;
            // }
            if (xSnake2 === x && ySnake2 === y) {
                window.cancelAnimationFrame(time);
                return;
            } else if (xSnake2 === x) {
                if (y > ySnake2) {
                    setYSnake2(++ySnake2)
                } else {
                    setYSnake2(--ySnake2)
                }
            } else if (ySnake2 === y) {
                if (x > xSnake2) {
                    setXSnake2(++xSnake2)
                } else {
                    setXSnake2(--xSnake2)
                }
            } else {
                let xDist = x - xSnake2;
                let yDist = y - ySnake2;
                if (xDist > 0) {
                    if (yDist > 0) {
                        setXSnake2(++xSnake2);
                        setYSnake2(++ySnake2);
                    } else {
                        setXSnake2(++xSnake2);
                        setYSnake2(--ySnake2);
                    }
                } else {
                    if (yDist > 0) {
                        setXSnake2(--xSnake2);
                        setYSnake2(++ySnake2);
                    } else {
                        setXSnake2(--xSnake2);
                        setYSnake2(--ySnake2);
                    }
                }
            }
        }

        // uncomment below to use keystrokes

        // foodMove(direction);
        
        snakeOneMove();
        snakeTwoMove();

        food.onload = () => {
            ctx.clearRect(0, 0, props.width, props.height);
            ctx.drawImage(food, x, y, 20, 20);
            ctx.drawImage(snake, xSnake, ySnake, 50, 50);
            ctx.drawImage(snake2, xSnake2, ySnake2, 50, 50);
        }
        food.src = burger;
        snake.src = burger;
        snake2.src = burger
    });


    return (
        <canvas id="game" width={props.width} height={props.height} className={GameBodyStyles.container}>
            Your browser does not support the HTML5 canvas tag.
        </canvas>
    )
}

GameBody.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};

GameBody.defaultProps = {
    width: 600,
    height: 600,
    speed: 5
};

export default GameBody;
