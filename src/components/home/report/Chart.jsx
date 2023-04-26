import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  DataSet,
  Network,
  Options,
  Data,
} from "vis-network/standalone/esm/vis-network";
const Chart = () => {
  const excelData = useSelector((state) => state.show_count.excel_data);
  let tempProps = JSON.parse(JSON.stringify(excelData));
  // console.log(excelData);
  // A reference to the div rendered by this component
  const domNode = useRef(null);

  // A reference to the vis network instance
  const network = useRef(null);

  // An array of nodes

  useEffect(() => {
    if (tempProps.length > 0) {
      // const nodes = new DataSet(tempProps);
      const nodes = new DataSet([
        { id: 1, label: "Node 1" },
        { id: 2, label: "Node 2" },
        { id: 3, label: "Node 3" },
        { id: 4, label: "Node 4" },
        { id: 5, label: "Node 5" },
      ]);

      // An array of edges
      const edges = new DataSet([
        { from: 1, to: 3 },
        { from: 1, to: 2 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
      ]);
      const data = {
        nodes,
        edges,
      };

      const options = {
        nodes: {
          shape: "dot",
          size: 10,
          font: {
            color: "#fff",
          },
        },
        physics: {
          forceAtlas2Based: {
            gravitationalConstant: -26,
            centralGravity: 0.005,
            springLength: 230,
            springConstant: 0.18,
          },
          maxVelocity: 146,
          solver: "forceAtlas2Based",
          timestep: 0.35,
          stabilization: { iterations: 150 },
        },
      };

      if (domNode.current) {
        network.current = new Network(domNode.current, data, options);
      }
    }
  }, [domNode, network, tempProps]);

  return <div ref={domNode} id="mynetwork"></div>;
};

export { Chart };
