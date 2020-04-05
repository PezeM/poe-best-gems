import React from 'react';
import { hot } from 'react-hot-loader/root';
import { GemList } from './gemList';
import { Typography } from 'antd';

const App = () => {
    return (
        <div>
            <Typography.Title level={2}>The most efficient gems to level up</Typography.Title>
            <GemList />
        </div>
    );
};

export default hot(App);
