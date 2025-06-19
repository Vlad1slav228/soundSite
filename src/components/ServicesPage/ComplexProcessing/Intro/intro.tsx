"use client";

import { useRouter } from "next/navigation";
import s from "./intro.module.scss";
import Image from "next/image";
import Link from "next/link";
import { APPLY_BUTTON, STUDIO_IMG } from "@/mocks/services";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/config";

interface ServiceProps {
  service: {
    id: number;
    title: string;
    list: string[];
    price: string;
    button: string;
  };
}

export default function IntroComplexProcessing({
  service,
}: Readonly<ServiceProps>) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/auth/me/`, {
          credentials: "include",
        });
        setIsAuth(res.ok);
      } catch {
        setIsAuth(false);
      }
    }
    checkAuth();
  }, []);

  const handleApplyClick = (e: React.MouseEvent) => {
    if (isAuth) {
      e.preventDefault();
      router.push("/personal-account");
    }
  };
  return (
    <section className={s.introBlock}>
      <div className={`container ${s.introContent}`}>
        <nav className={s.breadcrumbs} aria-label="breadcrumb">
          <ul>
            <li>
              <Link href="/">Главная</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/#services">Услуги</Link>
            </li>
            <li>/</li>
            <li className={s.active}>{service.title}</li>
          </ul>
        </nav>
        <h1 className={s.introServiceTitle}>{service.title}</h1>
        <ul className={s.introServiceList}>
          {service.list.map((item, index) => (
            <li key={index} className={s.introServiceListItem}>
              {item}
            </li>
          ))}
        </ul>
        <div className={s.introServiceFooter}>
          <p className={s.introServicePrice}>{service.price}</p>
          <Link
            href={`/booking?serviceId=${service.id}`}
            className={`greenButton ${s.greenButton}`}
            onClick={handleApplyClick}
          >
            {APPLY_BUTTON}
          </Link>
        </div>
      </div>
      <Image src={STUDIO_IMG} alt="Студия звукозаписи" />
    </section>
  );
}
