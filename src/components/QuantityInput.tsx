import { Icon } from '@iconify/react';
import React from 'react'
import { ICON } from '../utils';

type QuantityInputProps = {
    quantity: number;
    onChange: (e: any) => void;
}

function QuantityInput({ onChange, quantity }: QuantityInputProps) {
    return (
        <div className='d-flex align-items-center'>
            <button type='button' onClick={() => onChange(quantity - 1)} className='btn p-0'>
                <Icon icon={ICON.MINUS} className="icon25x25 color_red" />
            </button>
            <div className='m-1 font14 font_family_bold_italic'>{quantity}</div>
            <button type='button' onClick={() => onChange(quantity + 1)} className='btn p-0'>
                <Icon icon={ICON.PLUS} className="icon25x25 color_primary" />
            </button>
        </div>
    )
}

export default QuantityInput