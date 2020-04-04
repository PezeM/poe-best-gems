import React from 'react';

interface Props {
    value: boolean;
}

export const TableBooleanCell: React.FC<Props> = ({ value }) => {
    return <span>{value ? 'Yes' : 'No'}</span>;
};
