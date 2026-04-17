import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DepositModal({ open, onClose }) {

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={onClose}
                PaperProps={{
                    className: "bg-transparent shadow-none rounded-3xl",
                    sx: {
                        width: "420px",     // 👈 control here
                        maxWidth: "95%",    // responsive
                    },
                }}
            >
                <div className="bg-[#141414] text-white max-w-xl w-full p-5">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">💰 Deposit USDT</h2>
                        <button onClick={onClose}>✖</button>
                    </div>

                    {/* Balance Cards */}
                    <div className="bg-[#111827] p-4 rounded-xl w-full mb-4">
                        <p className="text-xs text-gray-400">USDT Balance</p>
                        <p className="font-semibold">$3.02</p>
                    </div>

                    <TextField
                        type="text"
                        name="password"
                        label="Enter Amount"
                        variant="outlined"
                        size="small"
                        fullWidth
                    //   value={formData.password}
                    //   onChange={handleChange}
                    />


                    <p className="text-xs text-gray-400 mt-2">
                        • Minimum $10
                    </p>

                    {/* Button */}
                    <Button
                        fullWidth
                        className="!mt-5 !rounded-full !py-3 !font-semibold"
                        sx={{
                            background:
                                "linear-gradient(180deg, #ff7a00, #ff3d00)",
                            color: "#000",
                        }}
                    >
                        Deposit Now
                    </Button>

                    {/* ROI */}
                    <div className="bg-[#111827] p-4 rounded-xl mt-4">
                        <p className="font-semibold mb-2">📈 Earnings & ROI</p>

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Daily ROI</span>
                            <span className="text-orange-400">3.33%</span>
                        </div>

                        <div className="flex justify-between text-sm mt-1">
                            <span className="text-gray-400">Duration</span>
                            <span>30 Days</span>
                        </div>

                        <div className="flex justify-between text-sm mt-1">
                            <span className="text-gray-400">Principal</span>
                            <span>Fully Returned</span>
                        </div>
                    </div>

                </div>
            </Dialog>
        </>
    );
}
