import { Icon } from "@iconify/react";
import React from "react";
import styled from "styled-components";
import { fShortenNumber } from "../utils/format";
import DatePicker, { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";

registerLocale("vi", vi);

const WrapperDateTime = styled.div`
    width: 200px;
    .react-datepicker__input-container input {
        height: 40px;
        width: 200px;
    }
`

type Props = {
  data: number;
  title: string;
  extraTitle?: string;
  icon: string;
  backgroundIcon: string;
  colorIcon: string;
  isDate?: boolean;
  dateRange?: any[];
  handleChangeTime?: (e: any) => void;
};
const Container = styled.div`
  min-height: 150px;
  height: 100%;
  border-radius: 5px
`;
function BaseAnalytic({
  data,
  title,
  extraTitle,
  icon,
  backgroundIcon,
  colorIcon,
  isDate = false,
  dateRange = [],
  handleChangeTime = (e: any) => null,
}: Props) {
  const [startDate, endDate] = dateRange;

  return (
    <Container className="w100_per bg_white p-4 d-flex justify-content-between box_shadow_card">
      <div className="d-flex justify-content-between flex-column">
        <div>
          <div className="font22 font_family_bold_italic">{title}</div>
          <div className="font14 font_family_italic color_888">
            {extraTitle}
          </div>
        </div>
        <div className="font20 font_family_bold_italic">{fShortenNumber(data)}</div>
      </div>
      <div className="d-flex flex-column justify-content-between align-items-end">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            background: backgroundIcon,
            width: "120px",
            height: "120px",
            borderRadius: "10px",
          }}
        >
          <Icon className="icon100x100" style={{ color: colorIcon }} icon={icon} />
        </div>
        {
          isDate && <WrapperDateTime>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update: any[]) => {
                handleChangeTime(update);
              }}
              locale="vi"
              isClearable
              maxDate={new Date()}
              dateFormat="dd/MM/yyyy"
              placeholderText='Chọn thời gian'
              onCalendarClose={() => {
                if (!startDate || !endDate)
                  handleChangeTime([null, null])
              }}
            />
          </WrapperDateTime>
        }
      </div>
    </Container>
  );
}

export default BaseAnalytic;
