import * as React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import { FTextField, FormProvider } from "../component/form";
import { useForm } from "react-hook-form";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

// import { Button, Stack, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 700,
  height: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

export default function LoginModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleClose = () => {
    navigate("/");
  };

  const defaultValues = {
    username: "web virgil learner",
    password: "123456",
  };

  const from = location.state?.from?.pathname;

  const methods = useForm({ resolver: yupResolver(schema), defaultValues });
  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    login(data.username, () => navigate(from || "/"));
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
          <Typography sx={{ fontSize: 30, textAlign: "center" }}>
            Login
          </Typography>

          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <FTextField name="username" label="Username" sx={{ mt: "2rem" }} />
            <FTextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              sx={{ mt: "2rem" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="error"
              sx={{ width: "100%", mt: "2rem" }}
            >
              SIGN IN
            </Button>
          </FormProvider>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "2rem",
            }}
          >
            <Typography sx={{ color: "red", cursor: "pointer" }}>
              Forgot password?
            </Typography>
            <Typography sx={{ color: "red", cursor: "pointer" }}>
              Don't have an account? Sign Up
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
