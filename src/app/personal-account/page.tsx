"use client";

import "@/styles/reset.scss";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import Header from "@/components/Header/header";
import AccountPage from "@/components/AccountPage/account";
import Footer from "@/components/Footer/footer";
import Loading from "@/components/LoadingPage/loading";

export default function PersonalAccount() {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetchWithAuth("/api/v1/auth/me/", {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Вы не авторизованы");
        }

        const data = await res.json();

        await new Promise((resolve) => setTimeout(resolve, 30_000));

        setProfile(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!profile) return <Loading />;

  return (
    <>
      <Header />
      <main>
        <AccountPage profile={profile} />
      </main>
      <Footer />
    </>
  );
}