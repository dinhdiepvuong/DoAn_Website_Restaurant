import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BaseAnalytic from "../base/BaseAnalytic";
import BaseLoading2 from "../base/BaseLoading2";
import AreaChartRevenue from "../components/analytic/AreaChartRevenue";
import BoxCustomerByBook from "../components/analytic/BoxCustomerByBook";
import CustomerByBook from "../components/analytic/CustomerByBook";
import SaleHistoryChart from "../components/analytic/SaleHistoryChart";
import TablePopularProduct from "../components/analytic/TablePopularProduct";
import TableRecentOrder from "../components/analytic/TableRecentOrder";
import TableTop10Customers from "../components/analytic/TableTop10Customers";
import { getCustomerByBook, getCustomerByTime, getDashboard, getRevenueByTime } from "../redux/slices/analytics";
import { AppDispatch } from "../redux/store";
// import { isLoginSelector } from "../redux/slices/employeeSlice";

const initStateTimeFilter = () => {
  const from = moment(new Date()).startOf('week').format();
  const newTime = {
    type: 'week',
    time: from,
  };

  return newTime;
}

const initStateTimeFilterCustomerByBook = () => {
  const from = moment(new Date()).endOf('month').format();
  const newTime = {
    type: 'month',
    time: from,
  };

  return newTime;
}


function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [revenueByTime, setRevenueByTime] = useState<{
    isLoading: boolean,
    data: {
      name: any[],
      value: any[]
    }
  }>({
    isLoading: true,
    data: {
      name: [],
      value: []
    }
  });
  const [timeFilter, setTimeFilter] = useState<any>(initStateTimeFilter());
  const [timeFilterCustomerByBook, setTimeFilterCustomerByBook] = useState<any>(initStateTimeFilterCustomerByBook());
  const [customerByBook, setCustomerByBook] = useState<{
    customer: number,
    book: number,
  }>({
    customer: 0,
    book: 0
  })
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<{
    totalCustomer?: number,
    totalRevenueToday?: number,
    totalRevenue30Day?: number,
    totalBook30Day?: number,
    newBooks?: any[],
    top10Customer?: any[],
    areaChartRevenue?: any,
  }>({});
  const [dateRange, setDateRange] = useState<any[]>([new Date("2022/01/01"), new Date()]);
  const [totalCustomer, setTotalCustomer] = useState<number>(0);

  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      try {
        const result = await dispatch(getDashboard(undefined)).unwrap();

        setData(result?.data);
      } catch (error) {
        console.log('error get dashboard', error)
      } finally {
        setIsLoading(false);
      }
    }
    initData();
  }, [dispatch]);

  useEffect(() => {
    const initData = async () => {
      try {
        setRevenueByTime((prevState) => {
          return {
            ...prevState,
            isLoading: true
          }
        });


        const result = await dispatch(getRevenueByTime(timeFilter)).unwrap();

        const { name, value } = result?.data;

        setRevenueByTime((prevState) => {
          return {
            ...prevState,
            data: {
              name: name || [],
              value: value || []
            }
          }
        })

      } catch (error) {

      } finally {
        setRevenueByTime((prevState) => {
          return {
            ...prevState,
            isLoading: false
          }
        });
      }
    }

    initData();
  }, [dispatch, timeFilter?.time]);

  useEffect(() => {
    const initData = async () => {
      try {
        const [startAt, endAt] = dateRange;
        const body: any = {
          startAt: new Date(moment(startAt).format()).getTime(),
          endAt: new Date(moment(endAt).endOf("d").format()).getTime()
        }

        const result = await dispatch(getCustomerByTime(body)).unwrap();

        const { totalCustomer } = result?.data;

        setTotalCustomer(totalCustomer || 0);
      } catch (error) {

      }
    }

    initData();
  }, [dateRange[1], dispatch])


  useEffect(() => {
    const initData = async () => {
      try {
        const result = await dispatch(getCustomerByBook(timeFilterCustomerByBook)).unwrap();

        const { customer, book } = result?.data;

        setCustomerByBook(() => {
          return {
            customer: customer || 0,
            book: book || 0

          }
        })

      } catch (error) {

      }
    }

    initData();
  }, [dispatch, timeFilterCustomerByBook?.time]);

  const handleChangeRevenueByTime = (e: any) => {
    setTimeFilter(e);
  }

  const handleChangeTime = (e: any) => {
    setDateRange(e);
  }

  const handleChangeCustomerByBookTime = (e: any) => {
    console.log('ccc', e);
    setTimeFilterCustomerByBook(e);
  }

  if (isLoading) <></>;

  return (
    <>
      <div className="row m-0 p-0">
        <div className="col-12 col-lg-12 d-flex justify-content-center font25 font_family_bold mb-4">Thống kê</div>
        <div className="col-6 col-xl-6 m-0 px-2 mb-3">
          <BaseAnalytic
            data={data?.totalRevenue30Day || 0}
            icon="mdi:currency-usd"
            backgroundIcon="rgb(167, 243, 208)"
            colorIcon="#047857"
            title="Doanh thu"
            extraTitle="(Trong 30 ngày)"
          />
        </div>
        <div className="col-6 col-xl-6 m-0 px-2 mb-3">
          <BaseAnalytic
            data={data?.totalBook30Day || 0}
            icon="ic:outline-shopping-cart"
            backgroundIcon="#facaca"
            colorIcon="#ff6e6e"
            title="Đơn đặt bàn"
            extraTitle="(Trong 30 ngày)"
          />
        </div>
        <div className="col-6 col-xl-6 m-0 px-2">
          <BaseAnalytic
            data={data?.totalRevenueToday || 0}
            icon="uil:usd-circle"
            backgroundIcon="#ffe8b2"
            colorIcon="#ffb300"
            title="Doanh thu trong ngày"
            extraTitle=""
          />
        </div>
        <div className="col-6 col-xl-6 m-0 px-2">
          <BaseAnalytic
            data={totalCustomer || 0}
            icon="la:user-check"
            backgroundIcon="rgb(147, 197, 253)"
            colorIcon="#1D4ED8"
            title="Khách hàng"
            extraTitle=""
            isDate
            dateRange={dateRange}
            handleChangeTime={handleChangeTime}
          />
        </div>
      </div>
      <div className="px-2 mt-4">
        <AreaChartRevenue handleChange={handleChangeRevenueByTime} data={revenueByTime?.data} />
      </div>
      {/* <div className="px-2 mt-4">
        <BoxCustomerByBook handleChange={handleChangeCustomerByBookTime} data={customerByBook} />
      </div> */}
      {/* <div className="px-2 mt-4">
        <TableRecentOrder data={data?.newBooks || []} />
      </div> */}
      <div className="px-2 mt-4">
        <TableTop10Customers data={data?.top10Customer || []} />
      </div>
    </>
  );
}

export default React.memo(Dashboard);
