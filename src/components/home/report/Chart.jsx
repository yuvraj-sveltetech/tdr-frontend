import React, { useState, useEffect, useLayoutEffect } from "react";
import useApiHandle from "../../utils/useApiHandle";
import { VOIP_GRAPH } from "../../utils/ConstantUrl";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";
import { create } from "@amcharts/amcharts4/core";
import { ForceDirectedSeries } from "@amcharts/amcharts4/plugins/forceDirected";

const Chart = ({ report_id, itemsLength, singleNoData }) => {
  const { data, loading, apiCall } = useApiHandle();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getChartData();
  }, []);

  useEffect(() => {
    if (singleNoData.length === 0) {
      if (data?.data) {
        setChartData(data?.data?.data);
      }
    } else {
      setChartData(singleNoData);
    }
  }, [data, singleNoData]);

  // Create root and chart

  useLayoutEffect(() => {
    if (chartData.length > 0) {
      // Create chart instance
      const chart = create(
        "chartdiv",
        am4plugins_forceDirected.ForceDirectedTree
      );

      // Set chart data
      chart.data = chartData;

      // Create series
      const series = chart.series.push(new ForceDirectedSeries());
      series.dataFields.value = "value";
      series.dataFields.name = "name";
      series.dataFields.children = "children";

      // Customize other series properties

      series.nodes.template.label.text = "{name}";
      series.nodes.template.tooltipText = "{name}";
      series.maxLevels = 1;
      series.dataFields.collapsed = "off";
      series.nodes.template.label.text = "{name}";
      series.nodes.template.distance = 1;
      series.fontSize = 12;
      series.minRadius = 35;
      series.maxRadius = 50;
      series.colors.list = [
        am4core.color("#272727"),
        am4core.color("#FF847C"),
        am4core.color("#116466"),
        am4core.color("#2C3531"),
      ];

      // ... (customize other series properties if needed)

      // Clean up chart when the component unmounts
      return () => {
        chart.dispose();
      };
    }
  }, [chartData]);

  const getChartData = async () => {
    apiCall("get", VOIP_GRAPH + `${report_id}/`, "");
  };

  return (
    <div className="chartdiv" style={{ width: "100%", height: "500px" }}>
      {chartData.length === 0 && itemsLength === 0 && (
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="spinner-border" role="status" />
            <h6>Preparing Chart...</h6>
          </div>
        </div>
      )}
    </div>
  );
};

export { Chart };
