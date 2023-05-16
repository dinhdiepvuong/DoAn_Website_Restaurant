import { Icon } from '@iconify/react';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { primaryColor } from '../../theme';
import { ICON } from '../../utils';
import { currencyFormat } from '../../utils/format';
import { ReportTime } from './ReportTime';

const Wrapper = styled.div`
    .apexcharts-toolbar {
        display: none;
    }
`;

const CButton = styled.button`
    padding: 5px 10px;
    display: flex;
    align-items: center;
`

type Props = {
    data: any;
    handleChange: (e: any) => void;
}

function AreaChartRevenue({ data, handleChange }: Props) {
    const chart: any = useMemo(() => {
        return {
            series: [
                {
                    name: 'Doanh thu',
                    data: data?.value || []
                }
            ],
            options: {
                chart: {
                    height: 350,
                    type: 'area'
                },
                markers: {
                    size: 5,
                    strokeWidth: 2,
                    fillOpacity: 0,
                    strokeOpacity: 0,
                    hover: {
                        size: 7
                    }
                },
                dataLabels: {
                    enabled: false
                },
                colors: [`${primaryColor}`],
                stroke: {
                    curve: 'smooth',
                    width: 3
                },
                grid: {
                    show: true,
                    borderColor: '#90A4AE',
                },
                xaxis: {
                    categories: data?.name || [],
                    labels: {
                        style: {
                            fontSize: '10px',
                            fontWeight: 'bold'
                        }
                    }
                },
                yaxis: {
                    labels: {
                        style: {
                            fontSize: '12px',
                            fontWeight: 'bold'
                        },
                        formatter: (val: any) => `${currencyFormat(val)}`
                    }
                },
            }
        }
    }, [data])

    return (
        <Wrapper className='w100_per bg_white p-4 box_shadow_card'>
            <div className='d-flex align-items-center justify-content-between'>
                <div className='font16 font_family_bold ml_10px'>Doanh thu</div>
                <ReportTime
                    onChangeDate={(e: any) => handleChange(e)}
                    displayFilter
                />
            </div>

            <ReactApexChart
                options={chart.options}
                series={chart.series}
                type="bar"
                height={300}
                width="100%"
            />
        </Wrapper>
    )
}

export default AreaChartRevenue