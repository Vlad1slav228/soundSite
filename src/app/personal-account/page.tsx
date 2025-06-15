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
  // const [profile, setProfile] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const cached = localStorage.getItem("profile");
      return cached ? (JSON.parse(cached) as Profile) : null;
    } catch {
      return null;
    }
  });

  const [error, setError] = useState("");

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const res = await fetchWithAuth("/api/v1/auth/me/", {
  //         method: "GET",
  //       });

  //       if (!res.ok) {
  //         throw new Error("Вы не авторизованы");
  //       }

  //       const data = await res.json();

  //       setProfile(data);
  //     } catch (err: any) {
  //       setError(err.message);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  useEffect(() => {
    if (profile) return;

    (async () => {
      try {
        const res = await fetchWithAuth("/api/v1/auth/me/", { method: "GET" });
        if (!res.ok) throw new Error("Вы не авторизованы");

        const data: Profile = await res.json();
        localStorage.setItem("profile", JSON.stringify(data));
        setProfile(data);
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, [profile]);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetchWithAuth("/api/v1/auth/logout/", {
        method: "POST",
        credentials: "include", 
      });
      if (!res.ok) {
        /* сервер вернул 401/5xx – сообщим и всё-равно продолжим */
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

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!profile) return <Loading />;

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
