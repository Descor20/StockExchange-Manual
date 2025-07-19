import React from "react";
import { Line } from "react-chartjs-2";
function LineChart(chartData) {
    return (
        <div className="chart">
            <Line style={{alignItems: "center", justifyContent: "center"}}
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
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
export default LineChart;