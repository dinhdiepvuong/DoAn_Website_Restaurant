import React from 'react'
import Select from 'react-select'
import styled from 'styled-components';

type Props = {
    option?: any[],
    onChange?: (e: any) => void;
    placeholder?: any;
    width?: any,
    isSetDefaultValue?: boolean
}

const Wrapper = styled.div<{ width: any }>`
    width: ${p => p.width}
`

function SelectFilterByType({ onChange = (e: any) => null, option = [], placeholder = 'Chọn', width = "100%", isSetDefaultValue = false }: Props) {
    return (
        <Wrapper width={width}>
            <Select
                // value={option.filter((option) => option.value.value === table.areaId)}
                styles={{
                    control: (provided, state) => ({
                        ...provided,
                        height: "40px",
                        marginTop: "8px",
                    }),
                }}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary25: "#ddd",
                        primary50: "#ddd",
                        primary: "rgba(0,159,127)",
                    },
                })}
                placeholder={placeholder}
                onChange={(value) => onChange(value)}
                options={option}
                defaultValue={isSetDefaultValue && option[0]}
            />
        </Wrapper>

    )
}

export default SelectFilterByType