import { Button } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";
import LinkIcon from "@mui/icons-material/Link";
import { useState } from "react";
import StatCard from "../../components/common/StatCard";
import DepositModal from "../../components/all/DepositModel";
import { useDispatch, useSelector } from "react-redux";
import { BookDown, BookDownIcon, Copy, CopyCheck, CopyCheckIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showSnackbar } from "../../redux/slices/snackbarSlice";

const UserHome = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(" User Data:", user);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const referralCode = user?.referralCode;
  const referralLink = referralCode ? `${window.location.origin}/auth/login?referredBy=${referralCode}` : "Login to get your referral link";


  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        dispatch(showSnackbar({
          message: "Referral link copied to clipboard! 📋",
          severity: "success"
        }))
      })
      .catch((error) => {
        dispatch(showSnackbar({
          message: "Failed to copy referral link. Try again! ❌",
          severity: "error"
        }))
      });
  };

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="bg-[#141414] rounded-2xl p-5 border border-white/5 shadow-lg flex justify-between">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wider">
              Joined Since
            </p>
            <p className="text-white text-lg font-semibold mt-1">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "--"}</p>
          </div>

          <div className="text-right">
            <p className="text-gray-400 text-xs uppercase tracking-wider">
             Sponsor Code
            </p>
            <p className="text-[var(--primary-color)] text-lg font-semibold mt-1">
              {user?.parentReferedCode ? user?.parentReferedCode : "N/A"}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="Total Stake Amount"
            value="$0"
            subText="Lost: $0"
            icon={<TrendingUpIcon className="text-[var(--primary-color)]" />}
            colorVar="success"
          />
          <StatCard
            title="Total Level Income"
            value="$0"
            subText="Lost: $0"
            icon={<TrendingDownIcon className="text-[var(--primary-color)]" />}
            colorVar="danger"
          />
          <StatCard
            title="Total Users"
            value="0"
            subText="Today: 0"
            icon={<GroupIcon className="text-[var(--primary-color)]" />}
            colorVar="primary"
          />
          <StatCard
            title="Total Investments"
            value="$0"
            subText="Today: $0"
            icon={<BusinessIcon className="text-[var(--primary-color)]" />}
            colorVar="accent"
          />
        </div>

        {/* Deposit / Withdraw */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => setOpen(true)}
            fullWidth
            variant="contained"
            startIcon={<BookDownIcon size={20} />}
          >
            Deposit
          </Button>

          <DepositModal open={open} onClose={() => setOpen(false)} />

          <Button
            fullWidth
            variant="outlined"
            startIcon={
              <img
                src="https://coin-images.coingecko.com/coins/images/33625/large/Liberland_Dollar_Square_200px.png?1702532879"
                alt="LLD"
                className="h-6 w-6"
              />
            }
            onClick={() => navigate("/user/buy-lld")}
          >
            Buy LLD Token
          </Button>
        </div>

        {/* Referral */}
        <div className="bg-[#141414] rounded-2xl p-5 border border-[var(--primary-color)]/40 shadow-[0_0_20px_rgba(255,137,4,0.1)] space-y-3">

          <div className="flex items-center gap-2">
            <LinkIcon className="text-[var(--primary-color)]" />
            <h2 className="text-white font-semibold text-lg">
              Your Referral Link
            </h2>
          </div>

          <p  className="text-gray-400 text-md flex items-center gap-2">
            <span className="text-[var(--primary-color)]">{referralLink}</span> <CopyCheckIcon onClick={handleCopy} />
          </p>

          <p className="text-gray-500 text-xs italic">
            Share this link to earn rewards automatically
          </p>
        </div>


        {/* Income History */}
        <div className="bg-[#141414] rounded-2xl p-5 border border-[var(--primary-color)]/30">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-semibold text-lg">
              Income History
            </h2>

            <Button
              size="small"
              sx={{
                color: "var(--primary-color)",
                border: "1px solid var(--primary-color)",
                borderRadius: "20px",
                fontSize: "0.7rem",
                "&:hover": {
                  background: "rgba(255,137,4,0.1)",
                },
              }}
            >
              View All
            </Button>
          </div>

          <p className="text-gray-500 text-center py-6">
            No income generated yet
          </p>
        </div>
      </div>
    </div>
  );

};

export default UserHome;