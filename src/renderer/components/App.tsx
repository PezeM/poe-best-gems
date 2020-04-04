import React from 'react';
import { hot } from 'react-hot-loader/root';
import { GemList } from './gemList';

const App = () => {
    return (
        <div>
            <h1>The most efficient gems to level up</h1>
            <GemList />
        </div>
    );
};

export default hot(App);
