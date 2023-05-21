import { ConfigProvider, DatePicker, Popover } from 'antd';
import localeValues from 'antd/lib/locale/vi_VN';
import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';

import 'moment/locale/vi';
import { Icon } from '@iconify/react';
import { ICON } from '../../utils';

moment.locale('en', {
  week: {
    dow: 1,
  },
});
moment.locale('en');

const initStateTimeActive = () => {
  const from_date = moment(new Date()).startOf('month').format('DD/MM/YYYY');
  const to_date = moment(new Date()).endOf('month').format('DD/MM/YYYY');
  const newTime = {
    title: `Tháng`,
    type: 'BY_MONTH',
    content: `${from_date} - ${to_date}`,
  };
  return newTime;
}

interface TimeStateProp {
  title: string;
  content: string;
  type: string;
}

const showDataTime = [
  {
    title: 'Theo ngày',
    type: 'BY_DAY',
  },
  {
    title: 'Theo tuần',
    type: 'BY_WEEK',
  },
  {
    title: 'Theo tháng',
    type: 'BY_MONTH',
  },
];

const { WeekPicker, MonthPicker } = DatePicker;

const TYPE_DATE_INDEX = {
  BY_DAY: 0,
  BY_WEEK: 1,
  BY_MONTH: 2
};

type ReportTimeProps = {
  displayFilter: boolean;
  onChangeDate: (time: any) => void;
};

export const ReportTimeCustomerByBook = ({ displayFilter, onChangeDate }: ReportTimeProps): JSX.Element => {
  const [timeActive, setTimeActive] = React.useState<TimeStateProp>(initStateTimeActive());
  const [isShowDate, setIsShowDate] = React.useState<boolean>(false);
  const [modeDate, setModeDate] = React.useState('date');

  const handleChangeTimeActive = (time: any, index: number) => {
    if (!time) {
      return;
    }
    if (index == TYPE_DATE_INDEX.BY_DAY) {
      const timeStr = time?.format('DD-MM-YYYY');
      const newTime = { title: 'Ngày', type: 'BY_DAY', content: timeStr };
      setTimeActive(newTime);

      onChangeDate({
        type: 'date',
        time: moment(time?.startOf('date')).format(),
      });
    }
    if (index == TYPE_DATE_INDEX.BY_WEEK) {
      const from_date = time?.startOf('week').format('DD-MM-YYYY');
      const to_date = time?.endOf('week').format('DD-MM-YYYY');
      const newTime = {
        title: `Tuần`,
        type: 'BY_WEEK',
        content: `${from_date} - ${to_date}`,
      };
      setTimeActive(newTime);

      onChangeDate({
        type: 'week',
        time: moment(time?.startOf('week')).format(),
      });
    }

    if (index == TYPE_DATE_INDEX.BY_MONTH) {
      const from_date = time?.startOf('month').format('DD-MM-YYYY');
      const to_date = time?.endOf('month').format('DD-MM-YYYY');
      const newTime = {
        title: `Tháng`,
        type: 'BY_MONTH',
        content: `${from_date} - ${to_date}`,
      };
      setTimeActive(newTime);

      onChangeDate({
        type: 'month',
        time: moment(time?.startOf('month')).format(),
      });
    }
  };

  const showCalendar = (index: any) => {
    if (index == TYPE_DATE_INDEX.BY_DAY) {
      setModeDate('date');
    } else if (index == TYPE_DATE_INDEX.BY_WEEK) {
      setModeDate('week');
    } else if (index == TYPE_DATE_INDEX.BY_MONTH) {
      setModeDate('month');
    }
    setIsShowDate(true);
  };

  const notShowCalendar = () => {
    setIsShowDate(false);
  };

  const content = () => (
    <WrapperDate onMouseLeave={notShowCalendar}>
      <WrapperList>
        {showDataTime.map((time, index) => (
          <WrapperListItem
            onClick={() => index <= 5 && handleChangeTimeActive(time, index)}
            onMouseOver={() => showCalendar(index)}
          >
            <ColLeft>
              {time.title}
            </ColLeft>
          </WrapperListItem>
        ))}
        <WrapperDateTime>
          {modeDate == 'date' ? (
            <DatePicker
              showToday={false}
              open={isShowDate}
              bordered={false}
              popupStyle={{ overflow: 'hidden' }}
              onSelect={e => handleChangeTimeActive(e, TYPE_DATE_INDEX.BY_DAY)}
            />
          ) :
            modeDate == 'week' ?
              (
                <WeekPicker
                  open={isShowDate}
                  bordered={false}
                  popupStyle={{ overflow: 'hidden' }}
                  onChange={e => handleChangeTimeActive(e, TYPE_DATE_INDEX.BY_WEEK)}
                />
              ) : <MonthPicker
                open={isShowDate}
                bordered={false}
                popupStyle={{ overflow: 'hidden' }}
                onChange={e => handleChangeTimeActive(e, TYPE_DATE_INDEX.BY_MONTH)}
              />}
        </WrapperDateTime>
      </WrapperList>
    </WrapperDate>
  );

  return (
    <Popover
      content={content}
      placement="bottomLeft"
      trigger={['click']}
      style={{ display: displayFilter ? 'block' : 'none' }}
    >
      <CDatePicker>
        <Icon className='icon20x20' icon={ICON.CALENDAR} />
        <div className='font_family_bold' style={{ whiteSpace: 'nowrap' }}>
          {timeActive.title}: {timeActive.content}
        </div>
        <Icon className='icon20x20' icon={ICON.DOWN} />
      </CDatePicker>
    </Popover>
  );
};

const CDatePicker = styled.div`
  padding: 0 18px;
  height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  border-radius: 6px;
  position: relative;
  border: 1px solid gray;

  &::after {
    content: ' ';
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background: #fff;
    opacity: 0.2;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const WrapperDate = styled.div`
  width: 430px;
  position: relative;
  .ant-picker {
    visibility: hidden;
  }
  &:after {
    content: ' ';
    width: 1px;
    height: 100%;
    background-color: #e1e1e1;
    position: absolute;
    top: 0;
    left: 160px;
  }
`;

const WrapperList = styled.ul`
  list-style: none;
  padding: 12px;
  margin: 0;
`;

const WrapperListItem = styled.li`
  display: flex;
  padding: 7px 10px;

  > span:first-child {
    width: 40%;
  }

  &:hover {
    background-color: #f0f0f0;
    span {
      color: #fff !important;
    }
  }
`;

const ColLeft = styled.div`
  &:hover {
    cursor: pointer;
    //background-color: #e1e1e1;
  }
`;

const ColRight = styled.div<{ isActive: boolean }>`
  margin-left: 10px;
  > span {
    color: ${p => (p.isActive ? '#fff' : 'transparent')};
  }
`;

const WrapperDateTime = styled.div`
  position: absolute;
  left: 160px;
  top: -43px;
`;
