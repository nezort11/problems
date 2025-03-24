"use strict";
import { useState, useEffect } from "react";

/*

Initial render:

- Fetch all job stories on start
- Fetch first 6 job details immidiatly
- Display loading...

Load more:

- trigger fetch additional 6 job details
- display button loading...
- check load more is possible

*/

const getJobStories = async () => {
  const jobStoriesResponse = await fetch(
    "https://hacker-news.firebaseio.com/v0/jobstories.json"
  );
  const jobStories = await jobStoriesResponse.json();
  return jobStories;
};

const getJobDetails = async (jobId) => {
  const jobDetailsResponse = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${jobId}.json`
  );
  const jobDetails = await jobDetailsResponse.json();
  return jobDetails;
};

const Link = (props) => {
  if (props.href) {
    return <a {...props}>{props.children}</a>;
  } else {
    return props.children;
  }
};

const LOAD_PAGE_SIZE = 6;

export default function App() {
  const [jobStories, setJobStories] = useState(undefined);
  const [jobs, setJobs] = useState(undefined);
  const [isFetchingJobs, setIsFetchingJobs] = useState(false);

  const fetchNextJobs = async (jobStories_) => {
    const nextJobIndex = jobs?.length ?? 0;

    const jobs_ = await Promise.all(
      jobStories_
        .slice(nextJobIndex, nextJobIndex + LOAD_PAGE_SIZE)
        .map((jobId) => getJobDetails(jobId))
    );
    setJobs((prevJobs) => [...(prevJobs ?? []), ...jobs_]);
  };

  const fetchJobs = async () => {
    const jobStories_ = await getJobStories();
    console.log("job stories", jobStories_);
    setJobStories(jobStories_);
    await fetchNextJobs(jobStories_);
  };

  const loadMore = async () => {
    setIsFetchingJobs(true);
    try {
      await fetchNextJobs(jobStories);
    } finally {
      setIsFetchingJobs(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Hacker News Job Board</h1>
      <div>
        {jobStories === undefined && jobs === undefined && (
          <p>Loading...</p>
        )}
        {jobs?.length === 0 && <p>No jobs</p>}
        {jobs && jobs.length > 0 && (
          <>
            <div className="jobs-container">
              {jobs.map((job) => (
                <div key={job.id} className="job-card">
                  <Link
                    href={job.url}
                    target="top"
                    rel="noopener noreferrer"
                    className="job-card__link"
                  >
                    <h5 className="job-card__title">{job.title}</h5>
                  </Link>
                  <p className="job-card__description">
                    By {job.by} •{" "}
                    {new Date(job.time * 1000).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {jobs.length >= jobStories.length ? (
              <></>
            ) : (
              <button onClick={loadMore} disabled={isFetchingJobs}>
                {isFetchingJobs ? "Loading..." : "Load more"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
