import React from "react";

const Candle = ({ type }) => {
  const color =
    type === "up"
      ? "bg-gradient-to-b from-green-300 to-green-500"
      : "bg-gradient-to-b from-red-300 to-red-500";

  return (
    <div className="flex items-end gap-[4px] h-16">
      {[12, 20, 28, 18, 24, 30, 16].map((h, i) => (
        <div key={i} className="flex flex-col items-center group">

          {/* Wick */}
          <div className="w-[2px] h-2 bg-gray-400 opacity-40" />

          {/* Body */}
          <div
            className={`${color} w-[6px] rounded-md shadow-md transition-all duration-300 group-hover:scale-110`}
            style={{ height: `${h}px` }}
          />

          {/* Bottom Wick */}
          <div className="w-[2px] h-2 bg-gray-400 opacity-40" />
        </div>
      ))}
    </div>
  );
};

const StatCard = ({ title, value, icon, trend }) => {
  const colors = [
    "from-orange-500 to-yellow-400",
    "from-cyan-500 to-blue-500",
    "from-green-500 to-emerald-400",
    "from-pink-500 to-rose-400",
    "from-purple-500 to-indigo-500",
  ];

  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="relative p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 group">

      {/* Glow */}
      <div className={`absolute -top-10 -right-10 w-44 h-44 bg-gradient-to-br ${color} opacity-20 rounded-full blur-3xl group-hover:scale-125 transition`} />

      {/* Top */}
      <div className="flex justify-between items-center mb-6">
        <div className="bg-white/10 p-3 rounded-xl text-lg shadow-inner">
          {icon}
        </div>

        <Candle type={trend} />
      </div>

      {/* Value */}
      <h2 className="text-3xl font-bold flex items-center gap-2 tracking-wide">
        {value}
        {trend && (
          <span
            className={`text-xs px-2 py-[3px] rounded-full font-medium ${trend === "up"
                ? "bg-green-400/20 text-green-400"
                : "bg-red-400/20 text-red-400"
              }`}
          >
            {trend === "up" ? "↑" : "↓"}
          </span>
        )}
      </h2>

      <p className="text-gray-400 text-sm mt-1">{title}</p>
    </div>
  );
};

const AdminDashboard = () => {
  const cards = [
    {
      title: "Total Earning",
      value: "$500.00",
      icon: "💳",
      trend: "up",
    },
    {
      title: "Total Orders",
      value: "$961",
      icon: "📋",
      trend: "down",
    },
    {
      title: "Total Income",
      value: "$203k",
      icon: "🏦",
    },
  ];

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-[#020d12] via-[#03151c] to-black min-h-screen text-white">

      {/* Top Cards */}
      <div className="grid md:grid-cols-3 gap-5 mb-6">
        {cards.map((card, i) => (
          <StatCard key={i} {...card} />
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid md:grid-cols-3 gap-5">

        {/* Chart */}
        <div className="md:col-span-2 bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-lg">

          <div className="flex justify-between items-center mb-5">
            <div>
              <p className="text-gray-400 text-sm">Total Growth</p>
              <h2 className="text-2xl font-bold">$2,324.00</h2>
            </div>

            <button className="bg-white/10 px-3 py-1 rounded-lg text-sm hover:bg-white/20 transition">
              Today ⌄
            </button>
          </div>

          <div className="h-64 flex items-end gap-2">
            {[40, 80, 60, 100, 70, 90, 50, 120, 60, 110].map((h, i) => (
              <div
                key={i}
                className="w-full bg-gradient-to-t from-orange-500 to-orange-300 rounded-md transition-all duration-300 hover:scale-105"
                style={{ height: `${h}%` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-lg">

          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold">Popular Stocks</h2>
            <span className="opacity-60">•••</span>
          </div>

          {[
            { name: "Bajaj Finery", price: "$1839.00", status: "profit" },
            { name: "TTML", price: "$100.00", status: "loss" },
            { name: "Reliance", price: "$200.00", status: "profit" },
          ].map((stock, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-3 border-b border-white/10 hover:bg-white/5 px-2 rounded-lg transition"
            >
              <div>
                <p className="text-sm font-medium">{stock.name}</p>
                <p
                  className={`text-xs ${stock.status === "profit"
                      ? "text-green-400"
                      : "text-red-400"
                    }`}
                >
                  {stock.status === "profit" ? "10% Profit" : "10% Loss"}
                </p>
              </div>

              <p className="text-sm font-semibold">{stock.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid md:grid-cols-2 gap-5 mt-6">

        {/* Donut */}
        <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-lg text-center">
          <h2 className="mb-4 font-semibold">Current Download</h2>

          <div className="w-40 h-40 mx-auto rounded-full border-[18px] border-orange-500/60 flex items-center justify-center shadow-inner">
            <span className="text-lg font-semibold">188,245</span>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-lg">
          <h2 className="mb-4 font-semibold">Area Installed</h2>

          <div className="space-y-4">
            {[
              { name: "Asia", value: "1.23k" },
              { name: "Europe", value: "6.79k" },
              { name: "America", value: "1.01k" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.name}</span>
                  <span>{item.value}</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full">
                  <div className="h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full w-[70%]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;