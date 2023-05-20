import React from 'react'
import { Radio, RadioGroup } from 'rsuite';

type BoxRadioProps = {
    data: any[];
    inline?: boolean;
    onChange?: (e: any) => void;
    value: any;
}

function BoxRadio({ data, inline = true, onChange = (e: any) => null, value }: BoxRadioProps) {
    return (
        <RadioGroup value={value} id='radioList' inline={inline} onChange={onChange}>
            {
                data.map((item: any, index: any) => (
                    <Radio value={item.value}>{item.name}</Radio>
                ))
            }
        </RadioGroup>
    )
}

export default BoxRadio