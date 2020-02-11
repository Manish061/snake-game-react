import React from 'react';
import GameHeader from './components/GameHeader/GameHeader';
import GameBody from './components/GameBody/GameBody';


function App() {
    return (
        <>
            <GameHeader>
            </GameHeader>
            <GameBody x={150} y={150} xSnake={[20, 480]} ySnake={[30, 490]}>
            </GameBody>
        </>
    )
}

export default App;