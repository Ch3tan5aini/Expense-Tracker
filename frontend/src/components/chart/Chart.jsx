import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const ChartView = (props) => {
  const [chartData, setChartData] = useState({
    options: {
      labels: ["Income", "Expense"],
      chart: {
        type: "donut",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "40%",
          },
        },
      },
    },
  });
  useEffect(() => {
    setChartData;
  }, []);
  return (
    <div>
      <Chart
        options={chartData.options}
        type="donut"
        series={[props.data.totalIncome, props.data.totalExpense]}
      />
    </div>
  );
};

export default ChartView;
