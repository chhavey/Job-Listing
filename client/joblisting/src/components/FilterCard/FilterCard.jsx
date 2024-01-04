import React, { useState, useEffect } from "react";
import style from "./filterCard.module.css";
import { RiSearchLine } from "react-icons/ri";
import { isUserLoggedIn } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import JobCard from "../JobCard.jsx/JobCard";
import { getAllJobs, filterJobs } from "./../../apis/jobs";

function FilterCard() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loggedIn, setLoggedIn] = useState(isUserLoggedIn());
  const [searchTerm, setSearchTerm] = useState("");
  const [jobList, setJobList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(isUserLoggedIn());
  }, [isUserLoggedIn()]);

  const fetchJobs = async () => {
    try {
      const response = await getAllJobs();
      setJobList(response);
      console.log("render hua");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchFilterJobs = async () => {
      try {
        if (!searchTerm && selectedSkills.length === 0) {
          fetchJobs();
        } else {
          const response = await filterJobs(searchTerm, selectedSkills);
          setJobList(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFilterJobs();
  }, [searchTerm, selectedSkills]);

  const handleSelectChange = (event) => {
    const selectedSkill = event.target.value;
    if (selectedSkill !== "Skills" && !selectedSkills.includes(selectedSkill)) {
      const updatedSkills = [...selectedSkills, selectedSkill];
      setSelectedSkills(updatedSkills);
    }
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = selectedSkills.filter(
      (skill) => skill !== skillToRemove
    );
    setSelectedSkills(updatedSkills);
  };

  const clearAllFilters = () => {
    setSelectedSkills([]);
    setSearchTerm("");
    const selectDropdown = document.getElementById("selectSkills");
    selectDropdown.value = "Skills";
    fetchJobs();
  };

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchTerm(searchText);
  };

  const handleAddJob = () => {
    navigate("/add");
  };

  return (
    <div className={style.container}>
      <div className={style.filterContainer}>
        <div className={style.searchContainer}>
          <RiSearchLine className={style.searchIcon} />
          <input
            type="text"
            placeholder="Type any job title"
            className={style.searchInput}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className={style.skills}>
          <div className={style.boxContainer}>
            <select
              id="selectSkills"
              className={style.selectlist}
              onChange={handleSelectChange}
            >
              <option disabled defaultValue>
                Skills
              </option>
              <option>HTML</option>
              <option>CSS</option>
              <option>JavaScript</option>
              <option>React.js</option>
              <option>Node.js</option>
              <option>Express.js</option>
              <option>MongoDB</option>
              <option>Postman</option>
            </select>
            <div className={style.skillContainer}>
              <div className={style.selectedSkills}>
                {selectedSkills.map((skill, index) => (
                  <div key={index} className={style.selectedSkill}>
                    {skill}
                    <div
                      onClick={() => removeSkill(skill)}
                      className={style.removeButton}
                    >
                      &#10006;
                    </div>
                  </div>
                ))}
              </div>
              <div className={style.loggedinClearBtn}>
                {loggedIn && selectedSkills.length > 0 && (
                  <div className={style.clearButton} onClick={clearAllFilters}>
                    Clear
                  </div>
                )}
              </div>
            </div>
          </div>
          {!loggedIn ? (
            <>
              {selectedSkills.length > 0 && (
                <div className={style.clearButton} onClick={clearAllFilters}>
                  Clear
                </div>
              )}
            </>
          ) : (
            <>
              <button className={style.addButton} onClick={handleAddJob}>
                + Add Job
              </button>
            </>
          )}
        </div>
      </div>
      <JobCard jobs={jobList} loggedIn={loggedIn} />
    </div>
  );
}

export default FilterCard;
