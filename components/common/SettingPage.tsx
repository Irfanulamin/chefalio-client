"use client";

import { FormField } from "@/components/common/FormField";
import { useAuth } from "@/hooks/axios";
import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import {
  ShieldCheckIcon,
  UserCircleIcon,
  LockKeyIcon,
  EnvelopeIcon,
  AtIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import z from "zod";
import { useProfile } from "@/hooks/useAuth";

const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: string;
}) => (
  <div className="flex items-center gap-3 py-2.5 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0">
      <Icon
        size={14}
        weight="duotone"
        className="text-zinc-500 dark:text-zinc-400"
      />
    </span>
    <span className="text-xs text-zinc-400 dark:text-zinc-500 w-16 shrink-0">
      {label}
    </span>
    <span className="text-sm text-zinc-700 dark:text-zinc-200 font-medium truncate">
      {value ?? "—"}
    </span>
  </div>
);

export default function SettingsPage() {
  const { profile, updateProfile } = useProfile();
  const { changePassword } = useAuth();

  const [activeTab, setActiveTab] = useState<"security" | "profile">("profile");

  const profileFieldDefinitions = [
    {
      name: "fullName",
      label: "Full Name",
      placeholder: "Enter your full name",
      type: "text",
    },
    {
      name: "image",
      label: "Profile Image",
      placeholder: "Upload your profile image",
      type: "dropzone",
    },
  ];

  const changePasswordSchema = z
    .object({
      newPassword: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
      currentPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const securityFieldDefinitions = [
    {
      name: "currentPassword",
      label: "Current Password",
      placeholder: "Enter current password",
      type: "password",
    },
    {
      name: "newPassword",
      label: "New Password",
      placeholder: "Enter new password",
      type: "password",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Confirm new password",
      type: "password",
    },
  ];

  const profileForm = useForm({
    defaultValues: { fullName: "", image: [] as File[] },
    onSubmit: async ({ value }) => {
      try {
        updateProfile(value);
        toast.success("Profile updated successfully!", {
          position: "bottom-right",
        });
        profileForm.reset();
      } catch (err: Error | unknown) {
        const msg =
          err instanceof Error ? err.message : "Failed to update profile.";
        toast.error(msg, { position: "bottom-right" });
      }
    },
  });

  const securityForm = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validators: { onSubmit: changePasswordSchema },
    onSubmit: async ({ value }) => {
      try {
        await changePassword({
          currentPassword: value.currentPassword,
          newPassword: value.newPassword,
        });
        toast.success("Password updated successfully!", {
          position: "bottom-right",
        });
        securityForm.reset();
      } catch (err: Error | unknown) {
        const msg =
          err instanceof Error ? err.message : "Failed to update password.";
        toast.error(msg, { position: "bottom-right" });
      }
    },
  });

  const tabs: {
    id: "security" | "profile";
    label: string;
    icon: React.ElementType;
  }[] = [
    { id: "profile", label: "Profile", icon: UserCircleIcon },
    { id: "security", label: "Security", icon: ShieldCheckIcon },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-5 md:py-10">
        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Account Settings
          </h1>
          <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
            Manage your profile and security preferences to keep your account up
            to date and secure.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-8 w-fit">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={[
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                activeTab === id
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm border border-zinc-200 dark:border-zinc-700"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200",
              ].join(" ")}
            >
              <Icon
                size={24}
                weight={activeTab === id ? "fill" : "regular"}
                className={activeTab === id ? "text-primary" : ""}
              />
              {label}
            </button>
          ))}
        </div>

        {activeTab === "profile" && (
          <div className="space-y-6">
            {/* Profile card */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
              {/* Banner */}
              <div className="h-24 from-lime-400 via-lime-500 to-green-500 relative bg-linear-to-r">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(56,189,248,0.3) 0%, transparent 50%),
                                      radial-gradient(circle at 80% 50%, rgba(167,139,250,0.2) 0%, transparent 50%)`,
                  }}
                />
              </div>

              <div className="px-6 pb-6">
                <div className="flex items-end justify-between -mt-10 mb-5">
                  <div className="relative">
                    <Image
                      src={
                        profile?.profile_url ||
                        "https://res.cloudinary.com/djgwnvlrb/image/upload/v1776530580/default-profile_j24ibg.png"
                      }
                      alt="Profile"
                      width={100}
                      height={100}
                      className="object-cover w-20 h-20 rounded-full border-4 border-lime-400"
                    />
                    <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white dark:border-zinc-900" />
                  </div>
                </div>

                <div className="mb-5">
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
                    {profile?.fullName || "Your Name"}
                  </h2>
                  <p className="text-sm text-zinc-400 dark:text-zinc-500">
                    @{profile?.username || "username"}
                  </p>
                </div>

                <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 px-4 py-1">
                  <InfoRow
                    icon={EnvelopeIcon}
                    label="Email"
                    value={profile?.email}
                  />
                  <InfoRow
                    icon={AtIcon}
                    label="Handle"
                    value={`@${profile?.username}`}
                  />
                  <InfoRow
                    icon={UserCircleIcon}
                    label="Name"
                    value={profile?.fullName}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    Edit Profile
                  </h3>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                    Update your public information
                  </p>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  profileForm.handleSubmit();
                }}
                className="space-y-5"
              >
                {profileFieldDefinitions.map((def) => (
                  <FormField key={def.name} form={profileForm} {...def} />
                ))}

                <div className="flex justify-end pt-2">
                  <Button type="submit" className="h-10 rounded-lg capitalize">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            {/* Security status card */}
            <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/90 dark:bg-emerald-950/20 p-5 flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800">
                <ShieldCheckIcon
                  size={20}
                  weight="fill"
                  className="text-emerald-500"
                />
              </span>
              <div>
                <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                  Account Protected
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-0.5">
                  Your account is secured with a strong password. If you
                  haven&apos;t updated your password in a while, consider
                  changing it to keep your account secure.
                </p>
              </div>
            </div>

            {/* Password form */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <LockKeyIcon
                    size={16}
                    weight="duotone"
                    className="text-zinc-500 dark:text-zinc-400"
                  />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    Change Password
                  </h3>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                    Use a strong, unique password
                  </p>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  securityForm.handleSubmit();
                }}
                className="space-y-5"
              >
                {securityFieldDefinitions.map((def) => (
                  <FormField key={def.name} form={securityForm} {...def} />
                ))}

                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
                    <ShieldCheckIcon
                      size={13}
                      weight="fill"
                      className="text-zinc-300 dark:text-zinc-600"
                    />
                    Minimum 8 characters recommended
                  </p>
                  <Button
                    type="submit"
                    className="h-10 rounded-lg flex items-center gap-1.5 capitalize"
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
