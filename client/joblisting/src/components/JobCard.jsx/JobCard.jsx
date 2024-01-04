import React from "react";
import style from "./jobCard.module.css";
import { MdPeopleAlt } from "react-icons/md";
import { LiaRupeeSignSolid } from "react-icons/lia";
import india from "../../assets/india.png";
import { useNavigate } from "react-router-dom";

function JobCard({ jobs, loggedIn }) {
  const navigate = useNavigate();

  const handleEditJob = (jobID) => {
    navigate(`/edit/${jobID}`);
  };

  const handleViewJob = (jobID) => {
    navigate(`/view/${jobID}`);
  };

  const renderSkills = (skills) => {
    const maxSkills = 3;
    const skillsToShow = skills.slice(0, maxSkills);
    return skillsToShow.map((item, index) => (
      <span className={style.skill} key={index}>
        {item}
      </span>
    ));
  };

  return (
    <>
      {jobs.map((job) => (
        <div key={job._id} className={style.container}>
          <div className={style.left}>
            <img src={job.logo} alt="job logo" />
          </div>

          <div className={style.center}>
            <div className={style.top}>{job.companyName}</div>
            <div className={style.middle}>
              <div className={style.people}>
                <MdPeopleAlt /> 11-50
              </div>
              <div className={style.salary}>
                <LiaRupeeSignSolid /> {job.monthlySalary}
              </div>
              <div className={style.location}>
                <img src={india} alt="india" /> {job.location}
              </div>
            </div>
            <div className={style.bottom}>
              <div>{job.workSetting}</div> <div>{job.jobType}</div>
            </div>
          </div>
          <div className={style.right}>
            <div className={style.skillList}>{renderSkills(job.skills)}</div>
            <div className={style.buttons}>
              <button
                className={loggedIn ? style.editBtn : style.invalid}
                onClick={() => handleEditJob(job._id)}
              >
                Edit job
              </button>
              <button
                className={style.viewBtn}
                onClick={() => handleViewJob(job._id)}
              >
                View details
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
export default JobCard;
