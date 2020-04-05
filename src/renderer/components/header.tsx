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
        <Row justify={'space-between'}>
            <Col span={16}>
                <Title level={4}>Gems count: {gemsCount}</Title>
                <Button type="primary" loading={isLoadingData} onClick={refreshData}>
                    Refresh data
                </Button>
            </Col>
            <Col span={8}>
                <div className="show-awakened-gems-container">
                    <Checkbox checked={isShowAwakenedGemsChecked} onChange={showAwakenedGems}>
                        Show awakened gems
                    </Checkbox>
                </div>
            </Col>
        </Row>
    );
};
