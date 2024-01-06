import React from "react";
import JobAdd from "../components/JobAdd/JobAdd";
import { useParams, useLocation } from "react-router-dom";

function AddJob() {
  const { id } = useParams();
  const location = useLocation();

  const type = location.pathname.includes("/edit/") ? "edit" : "add";
  return (
    <div>
      <JobAdd jobId={id} type={type} />
    </div>
  );
}

export default AddJob;
