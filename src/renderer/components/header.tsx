import React from 'react';
import { Row, Col, Typography, Checkbox, Button } from 'antd';
const { Title } = Typography;

interface Props {
    gemsCount: number;
    isLoadingData: boolean;
    refreshData: () => void;
    isShowAwakenedGemsChecked: boolean;
    showAwakenedGems: () => void;
}

export const Header: React.FC<Props> = ({ gemsCount, isLoadingData, refreshData, isShowAwakenedGemsChecked, showAwakenedGems }) => {
    return (
        <Row>
            <Col span={20}>
                <Title level={4}>Gems count: {gemsCount}</Title>
                <Button type="primary" loading={isLoadingData} onClick={refreshData}>
                    Refresh data
                </Button>
            </Col>
            <Col span={4}>
                <Checkbox checked={isShowAwakenedGemsChecked} onChange={showAwakenedGems}>
                    Show awakened gems
                </Checkbox>
            </Col>
        </Row>
    );
};
