import React from "react";
import JobDetail from "../components/JobDetail/JobDetail";
import { useParams } from "react-router-dom";

function ViewJob() {
  const { id } = useParams();
  return (
    <div>
      <JobDetail jobId={id} />
    </div>
  );
}

export default ViewJob;
