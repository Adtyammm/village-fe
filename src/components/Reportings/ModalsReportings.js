import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import { BsArrowRightSquare, BsTriangle, BsTriangleFill } from "react-icons/bs";

function ModalReporting({ reporting, index }) {
  const [voteCount, setVoteCount] = useState(reporting.vote);

  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const hasVotedBefore = sessionStorage.getItem(
      `voted-${reporting.complaint_id}`
    );
    if (hasVotedBefore) {
      setHasVoted(true);
    }
  }, [reporting.complaint_id]);

  const handleVote = () => {
    if (hasVoted) {
      return;
    }
    axios
      .put(
        `http://localhost:5000/rep/vReporting/vote/${reporting.complaint_id}`,
        {
          vote: voteCount + 1,
        }
      )
      .then((response) => {
        setVoteCount(voteCount + 1);
        setHasVoted(true);
        sessionStorage.setItem(`voted-${reporting.complaint_id}`, true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let statusText = reporting.work_status;
  let statusClass = "";
  switch (reporting.work_status) {
    case "Pending":
      return null;
    case "Accepted":
      statusText = "Processed";
      statusClass = "accepted-status";
      break;
    case "Rejected":
      statusClass = "rejected-status";
      break;
    case "Completed":
      statusClass = "completed-status";
      break;
    default:
      break;
  }

  return (
    <div className="row">
      <div className="col">
        <Card className="cardmodal">
          <Card.Body>
            <Card.Title>
              {hasVoted ? (
                <button className="btnvoteup">
                  <BsTriangleFill className="vote_done" size={30} />
                </button>
              ) : (
                <button className="btnvoteup" onClick={handleVote}>
                  <BsTriangle size={30} />
                </button>
              )}

              {reporting.complaint_title}
              {/* Pengaduan {urutan} */}
              <Link to={`/detailkeluhan/${reporting.complaint_id}`}>
                <button className="btndetail">
                  <BsArrowRightSquare size={30} />
                </button>
              </Link>
            </Card.Title>
            <p
              style={{
                marginLeft: "15px",
                float: "left",
              }}
            >
              {voteCount}
            </p>
            <Card.Text
              style={{
                marginLeft: "40px",
              }}
            >
              {reporting.complainants_name} |{" "}
              <b className={statusClass}>{statusText}</b>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ModalReporting;
