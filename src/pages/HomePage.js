import { Container } from "@mui/material";
import React from "react";
import JobList from "../component/JobList";
import jobs from "../data.json";

function HomePage() {
  return (
    <>
      <Container maxWidth="lg">
        <JobList jobs={jobs} />
      </Container>
    </>
  );
}

export default HomePage;
