import axios from 'axios';

export const getAllJobs = async () => {
    try {
        const reqUrl = `http://localhost:4000/job/alljobs`;
        const response = await axios.get(reqUrl);
        return response.data;
    }
    catch {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message || 'Cannot fetch jobs');
    }
}


export const filterJobs = async (jobPosition, skills) => {
    try {
        const reqUrl = `http://localhost:4000/job/job-filter?jobPosition=${jobPosition}&skills=${skills}`;
        const response = await axios.get(reqUrl);
        return response.data;
    }
    catch {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message || 'Cannot fetch jobs with filter');
    }
}

export const getJobById = async (jobId) => {
    try {
        const reqUrl = `http://localhost:4000/job/job-detail/${jobId}`;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.log(error.response);
        throw new Error(error.response.data.message || "Failed to fetch job details");
    }
};