import React from 'react';
import './style.scss';
import { Row, Col } from 'antd';

export const Titlebar = () => {
    return (
        <div className="titlebar">
            <Row>
                <Col span={8}>
                    <span className="title">Poe gems</span>
                </Col>
                <Col span={8} offset={8} className="right-side">
                    - [] X
                </Col>
            </Row>
        </div>
    );
};
