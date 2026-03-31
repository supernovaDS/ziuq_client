import React, { useState } from "react";

const Profile = ({ user }) => {
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Updated Data:", form);
  };

  return (
    <div className="min-h-screen px-6 py-10">

      <div className="max-w-6xl mx-auto space-y-5">

        {/* ================= HERO ================= */}
        <div className="relative rounded-3xl overflow-hidden border border-outline bg-surface-container-high/50 p-8 flex flex-col md:flex-row items-center gap-8">

          {/* glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 blur-[120px] rounded-full"></div>

          {/* avatar */}
          <div className="w-28 h-28 rounded-2xl bg-surface border border-outline flex items-center justify-center text-3xl font-black text-primary z-10">
            <img src="/favicon.svg" alt="" className="w-16 h-16" />
          </div>

          {/* identity */}
          <div className="z-10 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">
              {form.firstName} {form.lastName}
            </h1>

            <p className="text-primary text-sm mt-2 font-semibold">
              @{form.username}
            </p>

            <p className="text-on-surface-variant text-xs mt-3">
              Member since {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>

        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10">

          {/* ================= LEFT: FORM ================= */}
          <div className="space-y-3">

            {/* BASIC INFO */}
            <div className="glass-card p-6 rounded-3xl border border-outline space-y-6">

              <h2 className="text-xs uppercase tracking-widest text-on-surface-variant">
                Basic Information
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="bg-surface border border-outline-variant p-4 rounded-xl text-on-surface focus:ring-2 focus:ring-primary/50 outline-none"
                />

                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="bg-surface border border-outline-variant p-4 rounded-xl text-on-surface focus:ring-2 focus:ring-primary/50 outline-none"
                />
              </div>

              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full bg-surface border border-outline-variant p-4 rounded-xl text-on-surface focus:ring-2 focus:ring-primary/50 outline-none"
              />

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-surface border border-outline-variant p-4 rounded-xl text-on-surface focus:ring-2 focus:ring-primary/50 outline-none"
              />

            </div>

            {/* ACTION BAR */}
            <div className="flex justify-between items-center">

              <button className="text-on-surface-variant text-sm bg-white/5 border border-white/10 cursor-pointer px-6 py-3 rounded-full cursor-pointe uppercase tracking-widest hover:text-error transition">
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-6 py-3 rounded-full cursor-pointer bg-primary text-white font-bold text-sm uppercase tracking-widest hover:brightness-110 transition kinetic-glow"
              >
                Save Changes
              </button>

            </div>

          </div>

          {/* ================= RIGHT: META PANEL ================= */}
          <div className="space-y-6">

            {/* ACCOUNT INFO */}
            <div className="glass-card p-6 rounded-3xl border border-outline space-y-5">

              <h2 className="text-xs uppercase tracking-widest text-on-surface-variant">
                Account
              </h2>

              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Status</span>
                <span className="text-primary font-bold">Active</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Role</span>
                <span className="text-secondary font-bold">User</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">ID</span>
                <span className="text-on-surface font-mono text-xs truncate max-w-30">
                  {user?.username}
                </span>
              </div>

            </div>

            {/* QUICK INFO */}
            <div className="glass-card p-6 rounded-3xl border border-outline space-y-4">

              <p className="text-on-surface-variant text-sm">
                Keep your profile information updated to ensure a better experience across the platform.
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;