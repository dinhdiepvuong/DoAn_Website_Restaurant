import React from 'react'
import Select from 'react-select';

type CreateTableItemProps = {
    table: any;
    index: number;
    handleChooseArea: (value: any, index: number) => void;
    handleChangeInformation: (table: any, index: number) => void;
    handleDeleteTable: (index: number) => void;
    option: any[];
}

function CreateTableItem({ table, index, handleChooseArea, handleChangeInformation, handleDeleteTable, option }: CreateTableItemProps) {
    return (
        <>
            <div className="font_family_bold_italic font14">
                Chọn khu vực
            </div>
            <Select
                value={option.filter((option) => option.value.value === table.areaId)}
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
                placeholder="Chọn khu vực"
                onChange={(value) => handleChooseArea(value, index)}
                options={option}
            />
            <div className="font_family_bold_italic font14 mt-4">Tên bàn</div>
            <input
                className="mt-2 h40_px w100_per"
                placeholder="Tự động khi chọn khu vực"
                type="text"
                value={table.name}
                onChange={(e: any) => {
                    console.log('first', e.target.value);
                    handleChangeInformation({
                        ...table,
                        name: e.target?.value || '',
                    }, index)
                }}
            />
            <div className="font_family_bold_italic font14 mt-4">Số người tối đa</div>
            <input
                className="mt-2 h40_px w100_per"
                placeholder="Nhập số người tối đa"
                type="number"
                onChange={(e: any) => {
                    handleChangeInformation({
                        ...table,
                        quantity: Number(e.target?.value),
                    }, index)
                }}
            />
            <div>

            </div>
            {
                index > 0 && <button type='button' className='btn bg_red_bold font14 font_family_bold color_white mt-4'
                    onClick={() => handleDeleteTable(index)}>Xoá</button>
            }

        </>

    )
}

export default CreateTableItem;