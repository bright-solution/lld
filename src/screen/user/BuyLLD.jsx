import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import { WalletBalance } from "../../utils/WalletBalance";
import { color } from "framer-motion";
import { useSelector } from "react-redux";


const CONTRACT_ADDRESS = "0x22Ee9f3B1672e1b393e2B829eA57E9be864b6373";
const MAINNET_CHAIN_ID = "0x1";
const ABI = ["function buyWithETH(uint256 minLLD,address[3] calldata refs) external payable"];

export default function BuyLLD() {
    const { user } = useSelector((state) => state.auth);
    const [usdtAmount, setUsdtAmount] = useState("");
    const [ethRequired, setEthRequired] = useState(0);
    const [ethRequiredDisplay, setEthRequiredDisplay] = useState("—");

    const [ref1, setRef1] = useState(user?.uplineWallets?.[0] || "");
    const [ref2, setRef2] = useState(user?.uplineWallets?.[1] || "");
    const [ref3, setRef3] = useState(user?.uplineWallets?.[2] || "");

    const [walletAddress, setWalletAddress] = useState(null);
    const [ethBalance, setEthBalance] = useState(0);
    const [balanceDisplay, setBalanceDisplay] = useState("—");
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);

    const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
    const [statusMsg, setStatusMsg] = useState("");
    const [statusType, setStatusType] = useState("info");

    const debTimer = useRef(null);
    const lastReqId = useRef(0);

    const showStatus = (msg, type = "info") => {
        setStatusMsg(msg);
        setStatusType(type);
    };

    const checkNetwork = async () => {
        const chainId = await window.ethereum.request({ method: "eth_chainId" });
        const correct = chainId === MAINNET_CHAIN_ID;
        setIsCorrectNetwork(correct);
        return correct;
    };

    const switchToMainnet = async () => {
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: MAINNET_CHAIN_ID }],
            });
        } catch (e) {
            showStatus("Network switch failed: " + (e?.message || e), "err");
        }
    };

    const fetchBalance = async (addr, prov) => {
        const bal = await prov.getBalance(addr);
        const formatted = parseFloat(ethers.formatEther(bal));
        setEthBalance(formatted);
        setBalanceDisplay(formatted.toFixed(6) + " ETH");
        return formatted;
    };

    const connectWallet = async () => {
        if (!window.ethereum) {
            showStatus("MetaMask install karo pehle!", "err");
            return;
        }
        try {
            showStatus("Wallet connect ho rahi hai...", "info");
            await window.ethereum.request({ method: "eth_requestAccounts" });

            const netOk = await checkNetwork();
            if (!netOk) {
                await switchToMainnet();
                await checkNetwork();
            }

            const _provider = new ethers.BrowserProvider(window.ethereum);
            const _signer = await _provider.getSigner();
            const address = await _signer.getAddress();

            setProvider(_provider);
            setSigner(_signer);
            setWalletAddress(address);

            await fetchBalance(address, _provider);
            setStatusMsg("");

            window.ethereum.on("chainChanged", async () => {
                const correct = await checkNetwork();
                if (correct) {
                    const newProv = new ethers.BrowserProvider(window.ethereum);
                    const newSigner = await newProv.getSigner();
                    const addr = await newSigner.getAddress();
                    setProvider(newProv);
                    setSigner(newSigner);
                    setWalletAddress(addr);
                    await fetchBalance(addr, newProv);
                }
            });

            window.ethereum.on("accountsChanged", async (accounts) => {
                if (accounts.length === 0) {
                    setWalletAddress(null);
                    setSigner(null);
                    setEthBalance(0);
                    setBalanceDisplay("—");
                    setIsCorrectNetwork(false);
                } else {
                    const newProv = new ethers.BrowserProvider(window.ethereum);
                    const newSigner = await newProv.getSigner();
                    const addr = accounts[0];
                    setProvider(newProv);
                    setSigner(newSigner);
                    setWalletAddress(addr);
                    await checkNetwork();
                    await fetchBalance(addr, newProv);
                }
            });
        } catch (e) {
            showStatus("Connect failed: " + (e?.message || e), "err");
        }
    };

    useEffect(() => {
        if (debTimer.current) clearTimeout(debTimer.current);

        if (!usdtAmount || isNaN(usdtAmount) || parseFloat(usdtAmount) <= 0) {
            setEthRequired(0);
            setEthRequiredDisplay("—");
            return;
        }

        setEthRequiredDisplay("...");
        const rid = ++lastReqId.current;

        debTimer.current = setTimeout(async () => {
            try {
                const res = await fetch(
                    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
                );
                const data = await res.json();
                if (rid !== lastReqId.current) return;

                const price = data?.ethereum?.usd;
                if (!price) throw new Error("Price unavailable");

                const eth = parseFloat(usdtAmount) / price;
                setEthRequired(eth);
                setEthRequiredDisplay(eth.toFixed(6) + " ETH");
            } catch (e) {
                if (rid !== lastReqId.current) return;
                setEthRequired(0);
                setEthRequiredDisplay("Price fetch failed");
            }
        }, 500);
    }, [usdtAmount]);

    const buyWithETH = async () => {
        if (!signer) { showStatus("Pehle wallet connect karo", "err"); return; }
        if (!isCorrectNetwork) { showStatus("Mainnet pe switch karo", "err"); return; }
        if (ethBalance <= 0) { showStatus("ETH balance zero hai", "err"); return; }
        if (ethRequired <= 0) { showStatus("USDT amount enter karo", "err"); return; }
        if (ethBalance < ethRequired) { showStatus("ETH balance kam hai", "err"); return; }

        try {
            showStatus("Transaction prepare ho rahi hai...", "info");

            const ethAmt = ethers.parseEther(ethRequired.toFixed(18));
            const refs = [
                ref1 || walletAddress,
                ref2 || walletAddress,
                ref3 || walletAddress,
            ];

            const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
            const gas = await contract.buyWithETH.estimateGas(0, refs, { value: ethAmt });

            showStatus("Wallet se confirm karo...", "info");
            const tx = await contract.buyWithETH(0, refs, {
                value: ethAmt,
                gasLimit: (gas * 120n) / 100n,
            });

            showStatus("Transaction pending... " + tx.hash.slice(0, 14) + "...", "info");
            await tx.wait();
            showStatus("Buy Successful! 🚀", "ok");
            await fetchBalance(walletAddress, provider);
        } catch (e) {
            console.error(e);
            showStatus(e?.reason || e?.message || "Transaction failed", "err");
        }
    };

    const isLowBalance = walletAddress && ethRequired > 0 && ethBalance < ethRequired;

    const isBuyDisabled =
        !walletAddress ||
        !isCorrectNetwork ||
        !usdtAmount ||
        parseFloat(usdtAmount) <= 0 ||
        ethRequired <= 0 ||
        ethBalance < ethRequired;

    const styles = {
        wrap: {
            maxWidth: "480px",
            margin: "0 auto",
            padding: "2rem 1rem",
            fontFamily: "sans-serif",
        },
        card: {
            background: "#000",
            border: "1px solid var(--primary-color)",
            borderRadius: "16px",
            padding: "1.5rem",
            marginBottom: "1rem",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        },
        title: {
            fontSize: "20px",
            fontWeight: "600",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "var(--primary-color)",
        },
        dot: {
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            // background: "#1D9E75",
            display: "inline-block",
            background: "var(--primary-color)",
        },
        label: {
            fontSize: "13px",
            color: "#6b7280",
            display: "block",
            marginBottom: "6px",
        },
        input: {
            width: "100%",
            padding: "10px 14px",
            border: "1px solid var(--primary-color)",
            borderRadius: "10px",
            fontSize: "15px",
            outline: "none",
            marginBottom: "1rem",
        },
        infoBox: {
            // background: "#f9fafb",
            borderRadius: "10px",
            padding: "12px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            background: "var(--primary-color)",
            color: "#fff",
        },
        infoLabel: { fontSize: "13px", color: "white", fontWeight: "700" },
        infoVal: { fontSize: "16px", fontWeight: "600", color: "white" },
        badge: (type) => ({
            fontSize: "11px",
            padding: "3px 10px",
            borderRadius: "20px",
            display: "inline-flex",
            alignItems: "center",
            background:
                type === "connected" ? "#EAF3DE"
                    : type === "wrong" ? "#FAEEDA"
                        : "#FCEBEB",
            color:
                type === "connected" ? "#3B6D11"
                    : type === "wrong" ? "#854F0B"
                        : "#A32D2D",
        }),
        divider: {
            height: "1px",
            background: "#e5e7eb",
            margin: "1rem 0",
        },
        warnBox: {
            background: "#FAEEDA",
            borderRadius: "10px",
            padding: "10px 14px",
            fontSize: "13px",
            color: "#633806",
            marginBottom: "1rem",
        },
        statusBox: (type) => ({
            padding: "10px 14px",
            borderRadius: "10px",
            fontSize: "13px",
            marginTop: "12px",
            background:
                type === "ok" ? "#EAF3DE"
                    : type === "err" ? "#FCEBEB"
                        : "#E6F1FB",
            color:
                type === "ok" ? "#3B6D11"
                    : type === "err" ? "#A32D2D"
                        : "#185FA5",
        }),
        btn: (variant, disabled) => ({
            width: "100%",
            padding: "13px",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: disabled ? "not-allowed" : "pointer",
            border: "none",
            background:
                disabled ? "#9ca3af"
                    : variant === "primary" ? "#0F6E56"
                        : variant === "warn" ? "#854F0B"
                            : "#f3f4f6",
            color: variant === "plain" ? "#111" : "#fff",
            opacity: disabled ? 0.6 : 1,
            transition: "all 0.2s",
        }),
        addr: {
            fontSize: "11px",
            fontFamily: "monospace",
            color: "#6b7280",
            wordBreak: "break-all",
            marginTop: "6px",
        },
    };

    return (
        <div style={styles.wrap}>
            <div style={styles.card}>
                <div style={styles.title}>
                    <span style={styles.dot}></span> Buy LLD with ETH
                </div>

                {/* Wallet Connection */}
                <div style={{ marginBottom: "1rem" }}>
                    <label style={styles.label}>Wallet Status</label>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                        <span style={styles.badge(
                            !walletAddress ? "disconnected"
                                : !isCorrectNetwork ? "wrong"
                                    : "connected"
                        )}>
                            {!walletAddress ? "Not Connected"
                                : !isCorrectNetwork ? "Wrong Network"
                                    : "Connected"}
                        </span>
                        <button
                            style={{ ...styles.btn("plain", false), width: "auto", padding: "8px 16px", fontSize: "13px" }}
                            onClick={connectWallet}
                        >
                            {walletAddress ? "Reconnect" : "Connect Wallet"}
                        </button>
                    </div>
                    {walletAddress && <div style={styles.addr}>{walletAddress}</div>}
                </div>

                {/* Wrong Network Warning */}
                {walletAddress && !isCorrectNetwork && (
                    <div style={styles.warnBox}>
                        Wrong network detected. Ethereum Mainnet pe switch karo.
                        <br /><br />
                        <button
                            style={{ ...styles.btn("warn", false), width: "auto", padding: "7px 16px", fontSize: "13px" }}
                            onClick={switchToMainnet}
                        >
                            Switch to Mainnet
                        </button>
                    </div>
                )}

                {/* ETH Balance (MetaMask provider se) */}
                <div style={styles.infoBox}>
                    <span style={styles.infoLabel}>ETH Balance</span>
                    <span style={styles.infoVal}>{balanceDisplay}</span>
                </div>

                <div style={styles.divider}></div>

                {/* USDT Input */}
                <label style={styles.label}>USDT Amount</label>
                <input
                    style={styles.input}
                    type="number"
                    placeholder="e.g. 100"
                    value={usdtAmount}
                    onChange={(e) => setUsdtAmount(e.target.value)}
                    min="0"
                />

                {/* ETH Required */}
                <div style={styles.infoBox}>
                    <span style={styles.infoLabel}>ETH Required</span>
                    <span style={styles.infoVal}>{ethRequiredDisplay}</span>
                </div>

                {/* Low Balance Warning */}
                {isLowBalance && (
                    <div style={styles.warnBox}>
                        Insufficient ETH balance. You need at least {ethRequiredDisplay} to buy {usdtAmount} USDT worth of LLD.
                    </div>
                )}

                <div style={styles.divider}></div>

                {/* Referrals */}
                <label style={styles.label}>Referral Address 1 (optional)</label>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="0x..."
                    value={ref1}
                    onChange={(e) => setRef1(e.target.value)}
                />

                <label style={styles.label}>Referral Address 2 (optional)</label>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="0x..."
                    value={ref2}
                    onChange={(e) => setRef2(e.target.value)}
                />

                <label style={styles.label}>Referral Address 3 (optional)</label>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="0x..."
                    value={ref3}
                    onChange={(e) => setRef3(e.target.value)}
                />

                {/* Buy Button */}
                <button
                    style={styles.btn("primary", isBuyDisabled)}
                    disabled={isBuyDisabled}
                    onClick={buyWithETH}
                >
                    Buy LLD Now
                </button>

                {/* Status Message */}
                {statusMsg && (
                    <div style={styles.statusBox(statusType)}>{statusMsg}</div>
                )}
            </div>

            {/* ✅ WalletBalance Component - RPC se on-chain balance fetch karta hai */}
            {walletAddress && (
                <div style={styles.card}>
                    <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px", color: "var(--primary-color)" }}>
                        On-Chain Balance (via RPC)
                    </div>
                    <WalletBalance address={walletAddress} />
                </div>
            )}

            <div style={{ fontSize: "12px", color: "#9ca3af", textAlign: "center" }}>
                Contract: {CONTRACT_ADDRESS}
            </div>
        </div>
    );
}