"use client";

import "@/styles/reset.scss";
// import { useEffect, useState } from "react";
// import { fetchWithAuth } from "@/lib/fetchWithAuth";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import AccountPage from "@/components/AccountPage/account";

export default function PersonalAccount() {
  // const [profile, setProfile] = useState<any>(null);
  // const [error, setError] = useState("");

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

  // if (error) return <p style={{ color: "red" }}>{error}</p>;
  // if (!profile) return <p>Загрузка...</p>;

  return (
    <>
      <Header />
      <main>
        <AccountPage />
      </main>
       {/* <h1>Личный кабинет</h1>
      <p>Email: {profile.email}</p>
      <p>Имя: {profile.first_name}</p>
      <p>Фамилия: {profile.last_name}</p> */}
      <Footer />
    </>
  );
}
