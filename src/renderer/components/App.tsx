import React from 'react';
import { hot } from 'react-hot-loader/root';
import { GemList } from './gemList';
import { Typography } from 'antd';
import { Titlebar } from './Titlebar';

const App = () => {
    return (
        <div>
            <Titlebar />
            <div id="content">
                <Typography.Title level={2}>The most efficient gems to level up</Typography.Title>
                <GemList />
            </div>
        </div>
    );
};

export default hot(App);
