import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";

function DetailsReporting({ match }) {
  const [reportings, setReportings] = useState();
  const [showModal, setShowModal] = useState(false);
  const { complaint_id } = useParams();
  

useEffect(() => {
  const fetchReportingsByID = async () => {
    try {
      const response = await axios.get(
        `https://kosar-backend.vercel.app/rep/gReportingByID/${complaint_id}`
      );

      const data = response.data.data;
      if (data) {
        setReportings(data); // Ambil data dari respons
      } else {
        console.log("Data tidak ditemukan");
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchReportingsByID();
}, [complaint_id]);

const handleModal = () => {
  setShowModal(!showModal);
};


  let statusClass = "";
  let backgroundColor = "";
  let textColor = "";

  if (reportings && reportings.work_status) {
    switch (reportings.work_status) {
      case "Pending":
        statusClass = "pending-status";
        break;
      case "Accepted":
        statusClass = "accepted-status";
        backgroundColor = "#fec400";
        textColor = "white";
        break;
      case "Rejected":
        statusClass = "rejected-status";
        backgroundColor = "#f12b2c";
        textColor = "white";
        break;
      case "Completed":
        statusClass = "completed-status";
        backgroundColor = "#14bd96";
        textColor = "white";
        break;
      default:
        break;
    }
  }

  return (
    <Container>
      <div className="header">
        <div className="backbutton">
          <Link to="/home">
            <IoArrowBackOutline size={30} color="white" />
          </Link>
        </div>
        <div className="juduldetailpengaduan">
          <h1>Details Reportings</h1>
        </div>
      </div>

      <div className="tampilanhome row justify-content-around bs m-5">
        <div className="col">
          {reportings ? (
            <>
              <Container>
                <Row className="text-center">
                  <Col style={{ borderRight: "1px solid black" }}>
                    <strong>Complainants Name</strong> <br></br>{" "}
                    {reportings.complainants_name}
                  </Col>
                  <Col style={{ borderRight: "1px solid black" }}>
                    <strong>Category</strong> <br></br>{" "}
                    {reportings.complaint_category}
                  </Col>
                  <Col>
                    <strong>Status</strong> <br></br>
                    <b
                      className={statusClass}
                      style={{
                        padding: "5px",
                        backgroundColor,
                        color: textColor,
                        borderRadius: "5px",
                      }}
                    >
                      {reportings.work_status === "Diterima"
                        ? "Diproses"
                        : reportings.work_status}
                    </b>
                  </Col>
                </Row>
              </Container>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <Row className="tampilanhome row justify-content-around bs m-5">
        {reportings ? (
          <>
            <h1 className="text-center">Details</h1>
            <br></br>
            <p className="text-center">{reportings.description}</p>
            {reportings.work_status === "Rejected" && (
              <>
                <Button
                  onClick={handleModal}
                  className="alasanpenolakan w-50 m-auto"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  See Reasons for Rejection
                </Button>

                <Modal show={showModal} onHide={handleModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Reasons for Rejection</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{reportings.reason}</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleModal}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Row>
    </Container>
  );
}

export default DetailsReporting;
