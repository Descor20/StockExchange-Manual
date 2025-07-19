import React from "react";
import { Bar } from "react-chartjs-2";
function BarChart(chartData) {
    return (
        <div className="chart">
            <Bar style={{alignItems: "center", justifyContent: "center"}}
                  data={chartData}
                  options={{
                      plugins: {
                          title: {},
                          legend: {
                              display: false
                          }
                      }
                  }}
            />
        </div>
    );
}
export default BarChart;