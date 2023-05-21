import React, { useEffect, useState } from 'react'
import { Modal } from 'rsuite';
import styled from 'styled-components';
import BasePagination from '../../base/pagination';

const Wrapper = styled(Modal)`
    width: 1000px;
`;

const TableCell = styled.td`
  padding: 5px 10px;
`;
const TableCellHead = styled.th`
  padding: 10px;
`;

type DataModalType = {
    visible: boolean;
    data: any[];
    title: string;
    total: number;
}

type ModalListObjectProps = {
    data: DataModalType;
    header: any[];
    onChoose: (e: any) => void;
    chosenData: any;
    handleFilter?: (e: any) => void;
    handleClose: () => void;
    page: number;
    onChangePage?: (e: any) => void;
    isHiddenPagination?: boolean
}

function ModalListObject({ data, header, onChoose, chosenData, handleFilter, handleClose, page, onChangePage = (e: any) => null, isHiddenPagination = false }: ModalListObjectProps) {
    const [chosen, setChosen] = useState<any>(chosenData);
    const [search, setSearch] = useState<string>('');
    useEffect(() => {
        setChosen(chosenData);
    }, [chosenData, data.visible])

    const handleOk = () => {
        onChoose(chosen);
        handleClose();
    }

    const handleChangePage = (e: any) => {
        onChangePage(e);
    }

    return (
        <Wrapper open={data?.visible} onClose={handleClose} >
            <Modal.Header>
                <Modal.Title>
                    <div className='font14 font_family_bold'>{data?.title}</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex align-items-center row m-0 p-4'>
                    <div className='col-12 col-lg-3 font_family_bold font16'>Tìm kiếm</div>
                    <div className='col-12 col-lg-9 d-flex align-items-center justify-content-end'>
                        <input onChange={(e) => setSearch(e.target.value || '')} placeholder='Nhập thông tin tìm kiếm' className='h40_px mr_10px w50_per' type="text" />
                        <button onClick={() => handleFilter && handleFilter(search)} className='btn bg_primary font14 font_family_bold color_white'>Tìm kiếm</button>
                    </div>
                </div>
                <table className="w100_per bg_white box_shadow_card border_radius_3 w100_per">
                    <thead className="bg_ddd">
                        <tr>
                            {header.map((item, index) => (
                                <TableCellHead
                                    key={index}
                                    className="font_family_regular font14"
                                    style={{
                                        width: item.width,
                                        textAlign: item.textAlign,
                                    }}
                                >
                                    {item.name}
                                </TableCellHead>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {(data.data || []).map((item: any, index: number) => (
                            <tr onClick={() => setChosen((prevState: any) => {
                                return {
                                    ...prevState,
                                    data: item
                                }
                            })} className="border_top_gray_1px cursor_pointer" key={`${index}`}>
                                {
                                    header.map((column: any, indexColumn: number) => (
                                        <TableCell style={{
                                            width: item.width,
                                            textAlign: item.textAlign,
                                        }}>
                                            {
                                                column.render(item[column.dataKey], chosen?.data && chosen?.data[chosen?.dataKey] === item[chosen?.dataKey], indexColumn)
                                            }
                                        </TableCell>
                                    ))
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
                {
                    !isHiddenPagination && <div className='mt-4'>
                        <BasePagination total={data?.total} page={page} onChange={handleChangePage} />
                    </div>
                }
            </Modal.Body>
            <Modal.Footer className='mt-2'>
                <button onClick={handleClose} className='border_black_1px bg_white border_radius_5 mr_10px px-4 py-2 font14 font_family_bold'>Huỷ bỏ</button>
                <button onClick={handleOk} className='bg_primary color_white border_radius_5 mr_10px px-4 py-2 font14 font_family_bold'>Xác nhận</button>
            </Modal.Footer>
        </Wrapper>
    )
}

export default ModalListObject