import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate, useParams } from "react-router-dom";
import jobs from "../data.json";
import { Chip, Divider, Stack } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 800,
  minHeight: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export default function JobDetailModal() {
  const { jobId } = useParams();
  const job = jobs.find((job) => job.id === jobId);

  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
  };

  return (
    <div>
      <Modal
        open
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={1}>
            <Typography sx={{ fontSize: 30, textAlign: "center" }} gutterBottom>
              {job.title}
            </Typography>
            <Divider light sx={{ mt: "1px ", mb: "10px" }} />
            <Typography variant="body1" color="text.secondary">
              {job.description}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Skills:
            </Typography>
            <Box>
              {job.skills.map((skill) => (
                <Chip
                  key={skill}
                  sx={{ mr: "5px ", mb: "10px" }}
                  color="error"
                  size="small"
                  label={skill}
                />
              ))}
            </Box>
            <Typography variant="body1" color="text.secondary">
              City: {job.city}
            </Typography>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
