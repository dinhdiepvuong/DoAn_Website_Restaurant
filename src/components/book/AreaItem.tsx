import { Icon } from '@iconify/react';
import React, { useMemo } from 'react'
import { Badge } from 'react-bootstrap';
import styled from 'styled-components'
import { primaryColor } from '../../theme';
import { ICON } from '../../utils';
import Avatar from '../Avatar';

const Wrapper = styled.div<{ isChosen: boolean }>`
    border-radius: 5px;
    border: 1px solid ${p => p.isChosen ? primaryColor : `#000`};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    cursor: pointer;

    position: relative;
`

const IconIsChosen = styled(Icon)`
    position: absolute;
    top: 5px;
    right: 5px;
    color: ${primaryColor}
`

type AreaItemProps = {
    area: any;
    chosenArea: any;
    handleChooseArea: (area: any) => void;
    chosenTables: any[];
}
function AreaItem({ area, chosenArea, handleChooseArea, chosenTables }: AreaItemProps) {

    const count = useMemo(() => {
        const result = chosenTables.filter((item: any) => item?.table?.areaId === area.id);
        return result?.length || 0;
    }, [chosenTables]);

    return (
        <Wrapper onClick={() => handleChooseArea(area)} isChosen={chosenArea.id === area.id}>
            <Avatar url={area?.avatar} size={120} shape="circle" />
            <div className='mt-4 d-flex align-items-center'>
                <div className='font16 font_family_bold_italic'>{area?.name}</div>
                <div className='ml_10px'>
                    <Badge bg="success">Đã chọn: {count}</Badge>
                </div>
            </div>
            {
                chosenArea.id === area.id && <IconIsChosen className='icon25x25' icon={ICON.SELECTED} />
            }
        </Wrapper>
    )
}

export default AreaItem