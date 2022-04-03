import React from "react";
import JobCard from "./JobCard";
import { Grid, Pagination, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSearchParams } from "react-router-dom";

const LIMIT = 5;

function JobList({ jobs: allJobs }) {
  const [page, setPage] = React.useState(1);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  const handleChange = (event, value) => {
    setPage(value);
  };

  const jobs = allJobs.filter(({ title }) =>
    title.toLowerCase().includes(query.toLowerCase())
  );

  const totalPage = Math.ceil(jobs.length / LIMIT);

  if (jobs.length === 0) {
    return (
      <Typography
        sx={{ fontSize: 20, textAlign: "center", mt: "1rem" }}
        gutterBottom
      >
        No job found :)
      </Typography>
    );
  }

  return (
    <>
      <Grid container spacing={4} sx={{ mt: "10px" }}>
        {jobs.slice((page - 1) * LIMIT, page * LIMIT).map((job) => (
          <Grid key={job.id} item md={4} xs={12}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: "10px" }}>
        <Pagination
          count={totalPage}
          page={page}
          onChange={handleChange}
          color="error"
        />
      </Box>
    </>
  );
}

export default JobList;
