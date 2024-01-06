import axios from 'axios';

export const getAllJobs = async () => {
    try {
        const baseUrl = process.env.REACT_APP_BACKEND_URL;
        const reqUrl = `${baseUrl}/job/alljobs`;
        const response = await axios.get(reqUrl);
        return response.data;
    }
    catch (error) {
        throw new Error(error.response.data.message || 'Cannot fetch jobs');
    }
}


export const filterJobs = async (jobPosition, skills) => {
    try {
        const baseUrl = process.env.REACT_APP_BACKEND_URL;
        const reqUrl = `${baseUrl}/job/job-filter?jobPosition=${jobPosition}&skills=${skills}`;
        const response = await axios.get(reqUrl);
        return response.data;
    }
    catch (error) {
        throw new Error(error.response.data.message || 'Cannot fetch jobs with filter');
    }
}

export const getJobById = async (jobId) => {
    try {
        const baseUrl = process.env.REACT_APP_BACKEND_URL;
        const reqUrl = `${baseUrl}/job/job-detail/${jobId}`;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Failed to fetch job details");
    }
};

export const addJob = async (JobDetails, token) => {
    try {
        const baseUrl = process.env.REACT_APP_BACKEND_URL;
        const reqUrl = `${baseUrl}/job/job-post`;
        const response = await axios.post(reqUrl, JobDetails, {
            headers: {
                'Authorization': token,
            }
        });
        return response.status;
    }
    catch (error) {
        throw new Error(error.response.data.message || "Failed to add job");
    }
};

export const updateJob = async (jobId, JobDetails, token) => {
    try {
        const baseUrl = process.env.REACT_APP_BACKEND_URL;
        const reqUrl = `${baseUrl}/job/job-post/${jobId}`;
        const response = await axios.put(reqUrl, JobDetails, {
            headers: {
                'Authorization': token,
            }
        });
        return response.status;
    }
    catch (error) {
        throw new Error(error.response.data.message || "Failed to update job");
    }
};