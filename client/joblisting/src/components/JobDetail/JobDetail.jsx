import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import style from "./jobDetail.module.css";
import { getJobById } from "../../apis/jobs";
import { PiMoneyFill } from "react-icons/pi";
import { FaCalendar } from "react-icons/fa6";
import { isUserLoggedIn } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

function JobDetail({ jobId }) {
  const [loggedIn, setLoggedIn] = useState(isUserLoggedIn());
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(isUserLoggedIn());
  }, [isUserLoggedIn()]);

  const handleEditBtn = () => {
    navigate(`/edit/${jobId}`);
  };

  const [jobDetails, setJobDetails] = useState(null);
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const details = await getJobById(jobId);
        setJobDetails(details);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (!jobDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.overview}>
        {jobDetails.jobPosition} {jobDetails.workSetting} {jobDetails.jobType}{" "}
        job at {jobDetails.companyName}
        {/* WordPress Development work from home job/internship at Adyaka Infosec
          Private Limited */}
      </div>
      <div className={style.jobDetail}>
        <div className={style.topLeft}>
          <span>1w ago ・ {jobDetails.jobType}</span>
          <img src={jobDetails.logo} alt="company logo" />
          <span>{jobDetails.companyName}</span>
        </div>
        <div className={style.jobPosition}>
          {jobDetails.jobPosition}
          {loggedIn ? <button onClick={handleEditBtn}>Edit job</button> : ""}
        </div>
        <div className={style.location}>{jobDetails.location} | India</div>
        <div className={style.salary}>
          <div className={style.stipend}>
            <div>
              <PiMoneyFill style={{ fontSize: "large" }} /> &nbsp; Stipend
            </div>
            <span>{jobDetails.monthlySalary}</span>
          </div>
          <div className={style.duration}>
            <div>
              <FaCalendar /> &nbsp;Duration
            </div>
            <span>6 Months</span>
          </div>
        </div>

        <div className={style.heading}>About company</div>
        <div className={style.content}>{jobDetails.about}</div>

        <div className={style.heading}>About the job/internship</div>
        <div className={style.content}>{jobDetails.description} </div>

        <div className={style.heading}>Skill(s) required</div>
        <div className={style.skillsContainer}>
          {jobDetails.skills.map((skill, index) => (
            <span key={index} className={style.skill}>
              {skill}
            </span>
          ))}
        </div>

        <div className={style.heading}>Additional information</div>
        <div className={style.content}>{jobDetails.information}</div>
      </div>
    </div>
  );
}

export default JobDetail;
