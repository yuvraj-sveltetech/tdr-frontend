import React, { useEffect } from "react";
import {
  switchComponent,
  excelData,
} from "../../../redux/slices/BreadCrumbSlice";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { DataOnDom, Chart } from "../../utils/index";
import { saveAs } from "file-saver";
const XLSX = require("xlsx");

const ViewData = ({ downloadFile, downloadLink }) => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.show_count.excel_data);


  useEffect(() => {
    return () => dispatch(excelData({}));
  }, []);

  function writeFileQ(workbook, filename) {
    return new Promise((resolve, reject) => {
      XLSX.writeFileAsync(filename, workbook, (error, result) => {
        error ? reject(error) : resolve(result);
      });
    });
  }

 


  // function getSheetData(data, header) {
  //   var fields = Object.keys(data[0]);
  //   var sheetData = data.map(function (row) {
  //     return fields.map(function (fieldName) {
  //       return row[fieldName] ? row[fieldName] : "";
  //     });
  //   });
  //   sheetData.unshift(header);
  //   return sheetData;
  // }

  

  const switchTo = () => {
    dispatch(switchComponent("/report"));
  };

  const downloadExcel = () => {
    downloadFile(downloadLink);
  };
  const seeExcel = () => {
    // downloadFile(downloadLink);
  
      let ws = XLSX.utils.json_to_sheet(data, {
        header: Object.keys(data[0]),
      });
      let wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      let exportFileName = `workbook_${1}.xls`;
      XLSX.writeFile(wb, exportFileName);
    
  };

  return (
    <>
      <div className="top-content d-flex align-items-center justify-content-between p-2">
        <button
          className="btn btn-sm btn-light shadow bg-white rounded"
          data-toggle="tooltip"
          data-placement="top"
          title="Go back"
          onClick={switchTo}
        >
          <IoArrowBack />
        </button>
        {/* <button className="btn btn-success" onClick={downloadExcel}>
          Download
        </button> */}
        <button className="btn btn-success" onClick={seeExcel}>
          Download
        </button>
      </div>
      {/* <Chart /> */}
      <div className="data_table table-responsive mt-4 mx-2">
        <DataOnDom />
      </div>
    </>
  );
};

export { ViewData };
