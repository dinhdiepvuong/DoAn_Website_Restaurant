import React from 'react'

type TagProps = {
    name: string,
    color: string
}

function Tag({ color, name }: TagProps) {

    const getColor = (): { color: string, backgroundColor: string } => {
        switch (color) {
            case 'green':
                return { color: 'rgb(4, 120, 87)', backgroundColor: 'rgb(167, 243, 208)' };
            case 'blue':
                return { color: '#1D4ED8', backgroundColor: 'rgb(147, 197, 253)'};
            case 'yellow':
                return { color: 'rgb(255, 179, 0)', backgroundColor: 'rgb(255, 232, 178)' };
            case 'red':
                return { color: 'rgb(255, 110, 110)', backgroundColor: 'rgb(250, 202, 202)' };
            default:
                return { color: '#000', backgroundColor: '#ddd' };
        }
    }

    return (
        <div style={{ color: getColor().color, backgroundColor: getColor().backgroundColor, display: 'inline', padding: '2px 6px', borderRadius: '5px' }}>{name}</div>
    )
}

export default Tag;