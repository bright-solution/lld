import React, { useState } from "react";
import BackButton from "../../components/ui/BackButton";
import { User, Mail, Lock, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import WalletIcon from "@mui/icons-material/Wallet";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-start  px-4">
      <div className="w-full max-w-[420px] space-y-8 py-6">
        <BackButton title="Home" />
        <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 mt-5 border border-gray-700 shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-white">
              Create Account 🚀
            </h1>
            <p className="text-gray-400 text-sm">
              Register to start using the app
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <TextField
              type="text"
              name="name"
              label="Name"
              variant="outlined"
              size="small"
              fullWidth
            />
            <TextField
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              size="small"
              fullWidth
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              size="small"
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="small"
              startIcon={<LoginIcon />}
              sx={{
                background: "linear-gradient(135deg, #ff8904, #ff6a00)",
                fontWeight: 700,
                py: 1.4,
                boxShadow: "0 6px 20px rgba(255,137,2,0.3)",
                "&:hover": {
                  background: "linear-gradient(135deg, #ff6a00, #ff8904)",
                },
              }}
            >
              Register
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="text-gray-400 text-xs">OR</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          <Button
            type="submit"
            variant="outlined"
            fullWidth
            size="small"
            startIcon={<WalletIcon />}
          >
            Register with Wallet
          </Button>

          <p className="text-center text-gray-400 text-sm mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-[var(--primary-color)] cursor-pointer">
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;



