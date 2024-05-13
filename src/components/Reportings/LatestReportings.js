import axios from "axios";
import React, { useEffect, useState } from "react";
import ModalReporting from "../Reportings/ModalsReportings";

function LatestReportings() {
  const [reportings, setReportings] = useState([]);

  const [duplicateReportings, setDuplicateReportings] = useState([]);
  const [searchkey, setsearchkey] = useState();
  const [complaint_category, setcomplaint_category] = useState("all");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/rep/gReporting"
        );
        const data = response.data.data;
        setReportings(data);
        setDuplicateReportings(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  function filterBySearch() {
    const tempreportings = duplicateReportings.filter(
      (reporting) =>
        reporting.complaint_title
          .toLowerCase()
          .includes(searchkey.toLowerCase()) ||
        reporting.complainants_name
          .toLowerCase()
          .includes(searchkey.toLowerCase())
    );

    setReportings(tempreportings);
  }

  function filterByType(e) {
    setcomplaint_category(e);

    if (e !== "all") {
      const tempreportings = duplicateReportings.filter(
        (reporting) =>
          reporting.complaint_category.toLowerCase() === e.toLowerCase()
      );
      setReportings(tempreportings);
    } else {
      setReportings(duplicateReportings);
    }
  }

  const sortedreportings = reportings.sort((a, b) => b.vote - a.vote);

  return (
    <div className="row justify-content-center">
      <div className="row">
        <div className="col-sm mb-4">
          {" "}
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-sm">
          {" "}
          <select
            className="form-control custom-select"
            value={complaint_category}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">Select Category</option>
            <option value="Infrastruktur">Infrastruktur</option>
            <option value="Pelayanan Publik">Pelayan Publik</option>
            <option value="Keamanan dan Ketertiban">
              Keamanan dan Ketertiban
            </option>
            <option value="Kesehatan Masyarakat">Kesehatan Masyarakat</option>
            <option value="Lingkungan">Lingkungan</option>
          </select>
        </div>
      </div>
      <div className="row justify-content-center">
        {" "}
        {sortedreportings.length > 0 ? (
          sortedreportings.map((reporting, index) => (
            <div className="modals col-md-9" key={index}>
              <ModalReporting reporting={reporting} index={index} />
            </div>
          ))
        ) : (
          <p>Tidak ada data reporting</p>
        )}
      </div>
    </div>
  );
}

export default LatestReportings;
