import React, { useState, useEffect } from "react";
import API from "../api";
import { toast } from "react-toastify";

const Profile = ({ user, setUser }) => {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        username: "",
    });

    const [initialForm, setInitialForm] = useState({
        firstName: "",
        lastName: "",
        username: "",
    });

    useEffect(() => {
        const newForm = {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            username: user?.username
        };

        setForm(newForm);
        setInitialForm(newForm);
    }, [user]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const isChanged =
        form.firstName !== initialForm.firstName ||
        form.lastName !== initialForm.lastName ||
        form.username !== initialForm.username

    const handleSave = async () => {
        try {
            setLoading(true);
            const { data } = await API.put("/user/update-profile", form, { withCredentials: true });
            setUser && setUser(data.user);
            setInitialForm(form);
            toast.success("Profile updated successfully");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setForm(initialForm);
    };

    return (
        <div className="min-h-screen px-6 py-10">

            <div className="max-w-6xl mx-auto space-y-5">

                {/* HERO */}
                <div className="relative rounded-3xl overflow-hidden border border-outline bg-surface-container-high/50 p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 blur-[120px] rounded-full"></div>

                    <div className="w-28 h-28 rounded-2xl bg-surface border border-outline flex items-center justify-center text-3xl font-black text-primary z-10">
                        <img src="/favicon.svg" alt="" className="w-16 h-16" />
                    </div>

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

                {/* GRID */}
                <div className="grid md:grid-cols-[1.2fr_1fr] gap-10">

                    {/* LEFT */}
                    <div className="space-y-3">

                        <div className="glass-card p-6 rounded-3xl border border-outline space-y-6">

                            <h2 className="text-xs uppercase tracking-widest text-on-surface-variant">
                                Basic Information
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    className="bg-surface border border-outline-variant p-4 rounded-xl text-on-surface focus:ring-2 focus:ring-primary/50 outline-none"
                                />

                                <input
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    className="bg-surface border border-outline-variant p-4 rounded-xl text-on-surface focus:ring-2 focus:ring-primary/50 outline-none"
                                />
                            </div>

                            <input
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                className="w-full bg-surface border border-outline-variant p-4 rounded-xl text-on-surface focus:ring-2 focus:ring-primary/50 outline-none"
                            />

                        </div>

                        {/* ACTIONS */}
                        <div className="flex justify-between items-center">

                            <button
                                onClick={handleCancel}
                                className="text-on-surface-variant cursor-pointer text-sm bg-white/5 border border-white/10 px-6 py-3 rounded-full uppercase tracking-widest hover:text-error transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                disabled={loading || !isChanged}
                                className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-widest transition
                  ${loading || !isChanged
                                        ? "bg-surface-container-high text-on-surface-variant cursor-not-allowed"
                                        : "bg-primary text-white hover:brightness-110 kinetic-glow cursor-pointer"
                                    }`}
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </button>

                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6">

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

                        <div className="glass-card p-6 rounded-3xl border border-outline">
                            <p className="text-on-surface-variant text-sm">
                                Keep your profile information updated.
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Profile;