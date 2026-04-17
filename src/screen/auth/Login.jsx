// import BackButton from "../../components/ui/BackButton";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import TextField from "@mui/material/TextField";
// import { Button } from "@mui/material";
// import LoginIcon from "@mui/icons-material/Login";
// import WalletIcon from "@mui/icons-material/Wallet";
// import { useDispatch } from "react-redux";
// import { setUser } from "../../redux/slices/authSlice";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(setUser({ ...formData, token: "token", role: "user" }));
//     navigate("/user/home");
//   };

//   return (
//     <div className="flex justify-center items-start px-4">
//       <div className="w-full max-w-[420px] space-y-8 py-6">

//         <BackButton title="Home" />
//         <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl mt-5 p-6 border border-gray-700 shadow-lg space-y-6">

//           <div className="text-center space-y-2">
//             <h1 className="text-2xl font-semibold text-white">Welcome Back 👋</h1>
//             <p className="text-gray-400 text-sm">
//               Login to continue
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//             <TextField
//               type="email"
//               name="email"
//               label="Email"
//               variant="outlined"
//               size="small"
//               fullWidth
//               value={formData.email}
//               onChange={handleChange}
//             />
//             <TextField
//               type="password"
//               name="password"
//               label="Password"
//               variant="outlined"
//               size="small"
//               fullWidth
//               value={formData.password}
//               onChange={handleChange}
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               size="small"
//               startIcon={<LoginIcon />}
//               sx={{
//                 background: "linear-gradient(135deg, #ff8904, #ff6a00)",
//                 fontWeight: 700,
//                 py: 1.4,
//                 boxShadow: "0 6px 20px rgba(255,137,2,0.3)",
//                 "&:hover": {
//                   background: "linear-gradient(135deg, #ff6a00, #ff8904)",
//                 },
//               }}
//             >
//               Login
//             </Button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center gap-3">
//             <div className="flex-1 h-px bg-gray-700" />
//             <span className="text-gray-400 text-xs">OR</span>
//             <div className="flex-1 h-px bg-gray-700" />
//           </div>

//           <Button
//             type="submit"
//             variant="outlined"
//             fullWidth
//             size="small"
//             startIcon={<WalletIcon />}
//           >
//             Login with Wallet
//           </Button>

//           <p className="text-center text-gray-400 text-sm mt-3">
//             Don’t have an account?{" "}
//             <Link to="/register" className="text-[var(--primary-color)] cursor-pointer">Register</Link>
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Login;





import { useEffect, useState } from "react";
import WalletIcon from "@mui/icons-material/Wallet";
import BackButton from "../../components/ui/BackButton";
import { Button, TextField } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { userRegister, userLogin } from "../../api/auth.api";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/slices/authSlice";
import { showSnackbar } from "../../redux/slices/snackbarSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

const Register = () => {
  const [referredBy, setReferredBy] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("referredBy");

  const handleRegister = async () => {
    try {
      if (!window.ethereum) {
        dispatch(showSnackbar({
          message: "Install MetaMask first! 🦊",
          severity: "error"
        }));
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const walletAddress = accounts[0].toLowerCase();
      const response = await userRegister({ referredBy, walletAddress });
      console.log(response);
      if (response?.success) {
        dispatch(setUser(response?.user));
        dispatch(setToken(response?.token));
        dispatch(showSnackbar({ message: response?.message, severity: "success" }));
        navigate("/user/home");
      }
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({ message: error?.message, severity: "error" }));
    }
  };

  const handleLogin = async () => {
    try {
      if (!window.ethereum) {
        dispatch(showSnackbar({
          message: "Install MetaMask first! 🦊",
          severity: "error"
        }));
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const selectedAddress = accounts[0].toLowerCase();
      console.log("Selected Address:", selectedAddress);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signerAddress = (await signer.getAddress()).toLowerCase();

      if (signerAddress !== selectedAddress) {
        dispatch(showSnackbar({
          message: "MetaMask account mismatch ❌",
          severity: "error"
        }));
        return;
      }

      const response = await userLogin({
        walletAddress: selectedAddress,
      });
      if (response?.success) {
        dispatch(setUser(response?.user));
        dispatch(setToken(response?.token));
        dispatch(showSnackbar({ message: response?.message, severity: "success" }));
        navigate("/user/home");
      }
    } catch (err) {
      console.log(err);
      dispatch(showSnackbar({ message: err?.message || "Something went wrong", severity: "error" }));
    }
  };

  useEffect(() => {
    if (referralCode) {
      setReferredBy(referralCode.toUpperCase());
    }
  }, [referralCode]);

  return (
    <div
      className="flex justify-center items-start px-4 h-full">
      <div className="w-full max-w-[420px] space-y-8 py-6">
        <BackButton title="Home" />
        <div className="bg-gray-900/10 backdrop-blur-md rounded-2xl p-6 mt-5 border border-gray-700 shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-white">
              Join with Us
            </h1>
            <p className="text-gray-400 text-sm">
              Start your earning journey with us
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <TextField
              value={referredBy}
              onChange={(e) => setReferredBy(e.target.value?.toUpperCase())}
              type="text"
              name="referredBy"
              label="Referral Code"
              variant="outlined"
              size="small"
              fullWidth
            />

            <Button
              onClick={handleRegister}

              type="submit"
              variant="contained"
              fullWidth
              size="small"
              startIcon={<LoginIcon />}
            >
              Register With Wallet
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="text-gray-400 text-xs">OR</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          <Button
            onClick={handleLogin}
            type="submit"
            variant="outlined"
            fullWidth
            size="small"
            startIcon={<WalletIcon />}
          >
            Login with Wallet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
