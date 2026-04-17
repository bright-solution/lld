import React from "react";
import { User, Wallet, Link, Settings, LogOut, Instagram, Twitter, Send } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../../redux/slices/snackbarSlice";
import { Button } from "@mui/material";
import { logout } from "../../redux/slices/authSlice";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const referralLink = `${window.location.origin}/auth/login?referredBy=${user?.referralCode}` || "";
  const dispatch = useDispatch();

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

   const handleLogout = () => {
          dispatch(logout());
      };

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="bg-[#121212] border border-[var(--primary-color)]/40 rounded-2xl p-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-[var(--primary-color)] flex items-center justify-center text-white text-2xl font-bold mb-4">
            {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
          </div>

          <h2 className="text-[var(--primary-color)] text-lg font-semibold">
            {user?.username || "User"}
          </h2>
          <h2 className="text-white text-md font-medium">
            {user?.walletAddress || "N/A"}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Joined: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "--"}
          </p>
        </div>

        {/* Wallet Summary */}
        <div className="bg-[#121212] border border-[var(--primary-color)]/40 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Wallet size={18} className="text-[var(--primary-color)]" />
            Wallet Summary
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total Balance</span>
            <span className="text-white font-semibold">$0</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total Withdrawn</span>
            <span className="text-white font-semibold">$0</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total Earnings</span>
            <span className="text-white font-semibold">$0</span>
          </div>
        </div>

        {/* Referral Section */}
        <div className="bg-[#121212] border border-[var(--primary-color)]/40 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Link size={18} className="text-[var(--primary-color)]" />
            Referral Info
          </div>

          <p className="text-gray-400 text-sm break-all">
            {referralLink}
          </p>

          <Button
            variant="contained"
            fullWidth
            size="small"
            onClick={handleCopy}
            className="!rounded-full"
          >
            Copy Referral Link
          </Button>
        </div>

        {/* Settings Section */}
        <div className="bg-[#121212] border border-[var(--primary-color)]/40 rounded-2xl p-5 space-y-4">
          <button className="w-full flex items-center justify-between bg-black/40 border border-gray-700 rounded-xl px-4 py-3 hover:bg-black/60 transition">
            <div className="flex items-center gap-2 text-white">
              <Send size={16} className="text-[var(--primary-color)]" />
              Go to Telegram
            </div>
          </button>

          <button className="w-full flex items-center justify-between bg-black/40 border border-gray-700 rounded-xl px-4 py-3 hover:bg-black/60 transition">
            <div className="flex items-center gap-2 text-white">
              <Twitter size={16} className="text-[var(--primary-color)]" />
              Go to Twitter
            </div>
          </button>

          <button className="w-full flex items-center justify-between bg-black/40 border border-gray-700 rounded-xl px-4 py-3 hover:bg-black/60 transition">
            <div className="flex items-center gap-2 text-white">
              <Instagram size={16} className="text-[var(--primary-color)]" />
              Go to Instagram
            </div>
          </button>

          <button onClick={handleLogout} className="w-full flex items-center justify-between bg-black/40 border border-red-500/40 rounded-xl px-4 py-3 hover:bg-red-500/10 transition text-red-500">
            <div className="flex items-center gap-2">
              <LogOut size={16} />
              Logout
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
