import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  currencyFormat,
  fShortenNumber,
  thousandFormat,
} from "../../utils/format";

function SaleHistoryChart() {
  const dashboard: any = undefined

  const [state, setState] = useState<any>();
  useEffect(() => {
    setState({
      series: [
        {
          name: "Revenue",
          type: "column",
          data: dashboard?.saleHistory?.revenue,
        },
        {
          name: "Order",
          type: "area",
          data: dashboard?.saleHistory?.orders,
        },
      ],
      options: {
        chart: {
          height: 500,
          type: "line",
        },
        plotOptions: {
          bar: {
            columnWidth: "40%",
            borderRadius: 10,
          },
        },
        stroke: {
          width: [0, 4],
          curve: "smooth",
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: [1, 0.25],
          gradient: {
            inverseColors: false,
            shade: "light",
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100],
          },
        },
        title: {
          text: "Sale History",
          margin: 30,
          offsetX: 10,
          style: {
            fontSize: "18px",
            fontWeight: "normal",
            fontFamily: "san-serif",
            color: "#888888",
          },
        },
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        xaxis: {
          type: "date",
          tooltip: {
            enabled: false,
          },
        },
        yaxis: [
          {
            title: {
              text: "Revenue",
              style: {
                color: "#888888",
                fontSize: "14px",
                fontFamily: "",
              },
            },
            labels: {
              style: {
                colors: [],
                fontSize: "14px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 400,
              },
              formatter: (value: number) => {
                return fShortenNumber(value);
              },
            },
          },
          {
            opposite: true,
            title: {
              text: "Order",
              style: {
                color: "#888888",
                fontSize: "14px",
                fontFamily: "",
              },
            },
            labels: {
              formatter: (value: number) => {
                return thousandFormat(value);
              },
            },
          },
        ],
      },
    });
  }, []);
  if (!state) return null;
  return (
    <div className="bg_white box_shadow_card border_radius_5">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={500}
      />
    </div>
  );
}

export default SaleHistoryChart;
