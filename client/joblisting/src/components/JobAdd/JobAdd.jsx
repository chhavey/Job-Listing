import React, { useState, useEffect } from "react";
import style from "./jobAdd.module.css";
import banner from "../../assets/addJobBanner.png";
import { getJobById, addJob, updateJob } from "../../apis/jobs";
import { useNavigate } from "react-router-dom";

function JobAdd({ jobId, type }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    logo: "",
    jobPosition: "",
    monthlySalary: "",
    jobType: "",
    workSetting: "",
    location: "",
    description: "",
    about: "",
    skills: "",
    information: "",
  });

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobDetails = await getJobById(jobId);
        setFormData(jobDetails);
      } catch (error) {
        console.log(error);
      }
    };

    if (type === "edit" && jobId) {
      fetchJobDetails();
    }
  }, [jobId, type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (type === "add") {
        await addJob(formData, token);
        console.log("success");
      } else if (type === "edit") {
        await updateJob(jobId, formData, token);
        console.log("demo success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };
  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <div className={style.form}>
          <div className={style.heading}>Add job description</div>
          <form onSubmit={handleSubmit}>
            <div className={style.formElement}>
              <div className={style.element}>
                <span>Company Name</span>
                <input
                  type="text"
                  placeholder="Enter your company name here"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
              <div className={style.element}>
                <span>Add logo URL</span>
                <input
                  type="text"
                  placeholder="Enter the link"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                />
              </div>
              <div className={style.element}>
                <span>Job position</span>
                <input
                  type="text"
                  placeholder="Enter job position"
                  name="jobPosition"
                  value={formData.jobPosition}
                  onChange={handleChange}
                />
              </div>
              <div className={style.element}>
                <span>Monthly salary</span>
                <input
                  type="text"
                  placeholder="Enter Amount in rupees"
                  name="monthlySalary"
                  value={formData.monthlySalary}
                  onChange={handleChange}
                />
              </div>
              <div className={style.element}>
                <span>Job type</span>
                <select
                  className={style.selectList}
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                >
                  <option disabled defaultValue>
                    Select
                  </option>
                  <option>Part-time</option>
                  <option>Full-time</option>
                  <option>Internship</option>
                </select>
              </div>
              <div className={style.element}>
                <span>Remote/Office</span>
                <select
                  className={style.selectList}
                  name="workSetting"
                  value={formData.workSetting}
                  onChange={handleChange}
                >
                  <option disabled defaultValue>
                    Select
                  </option>
                  <option>Remote</option>
                  <option>Office</option>
                </select>
              </div>
              <div className={style.element}>
                <span>Location</span>
                <input
                  type="text"
                  placeholder="Enter Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div className={style.element}>
                <span>Job Description</span>
                <input
                  type="text"
                  placeholder="Type the job description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className={style.element}>
                <span>About Company</span>
                <input
                  type="text"
                  placeholder="Type about your company"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                />
              </div>
              <div className={style.element}>
                <span>Skills Required</span>
                <input
                  type="text"
                  placeholder="Enter the must have skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </div>
              <div className={style.element}>
                <span>Information</span>
                <input
                  type="text"
                  placeholder="Enter the additional information"
                  name="information"
                  value={formData.information}
                  onChange={handleChange}
                />
              </div>
              <div className={style.buttons}>
                <button className={style.cancelBtn} onClick={handleCancel}>
                  Cancel
                </button>

                <button className={style.addBtn} onClick={handleSubmit}>
                  {type === "add" ? <>+ Add job</> : <>Update job</>}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={style.banner}>
        <img src={banner} />
        <div className={style.text}>Recruiter add job details here</div>
      </div>
    </div>
  );
}

export default JobAdd;
