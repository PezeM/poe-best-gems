import React from 'react';
import './style.scss';
import { Row, Col } from 'antd';
import { MinusOutlined, CloseSquareOutlined, ExpandOutlined } from '@ant-design/icons';
import { remote } from 'electron';

export const Titlebar = () => {
    function minimize() {
        remote.getCurrentWindow().minimize();
    }

    function expand() {
        const currentWindow = remote.getCurrentWindow();
        if (currentWindow.isMaximized()) {
            currentWindow.unmaximize();
        } else {
            currentWindow.maximize();
        }
    }

    function close() {
        remote.app.quit();
    }

    return (
        <div className="titlebar">
            <Row>
                <Col span={8}>
                    <span className="title">Poe gems</span>
                </Col>
                <Col span={8} offset={8} className="right-side">
                    <MinusOutlined className="icon" onClick={minimize} />
                    <ExpandOutlined className="icon" onClick={expand} />
                    <CloseSquareOutlined className="icon exit-icon" onClick={close} />
                </Col>
            </Row>
        </div>
    );
};
