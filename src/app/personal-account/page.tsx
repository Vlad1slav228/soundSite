"use client";

import "@/styles/reset.scss";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import Header from "@/components/Header/header";
import AccountPage from "@/components/AccountPage/account";
import Footer from "@/components/Footer/footer";
import Loading from "@/components/LoadingPage/loading";
import type { Profile } from "@/components/AccountPage/account";
import { useRouter } from "next/navigation";

export default function PersonalAccount() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetchWithAuth("/api/v1/auth/me/", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Вы не авторизованы");
        const data: Profile = await res.json();
        setProfile(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetchWithAuth("/api/v1/auth/logout/", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        console.warn("Logout error:", await res.text());
      }
    } catch (e) {
      console.warn("Logout network error:", e);
    } finally {
      localStorage.removeItem("profile");
      localStorage.removeItem("access_token");
      window.dispatchEvent(new StorageEvent("storage"));
      router.replace("/");
    }
  };

  if (loading) return <Loading />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!profile) return null;

  return (
    <>
      <Header />
      <main>
        <AccountPage profile={profile} onLogout={handleLogout} />
      </main>
      <Footer />
    </>
  );
}
