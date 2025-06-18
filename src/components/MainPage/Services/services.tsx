'use client'

import { useState, useEffect } from "react";
import s from "./services.module.scss";
import ServiceCard from "./ServicesCard/servicesCard";
import { Fragment } from "react";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

interface Service {
  id: number;
  price: number;
  title: string;
  features: string | string[]; // Может быть как строкой, так и массивом
  duration_min: number;
  is_active: boolean;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Service[];
}

export default function ServicesMain() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetchWithAuth("/api/v1/services/", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: ApiResponse = await res.json();
        setServices(data.results.filter(service => service.is_active));
      } catch (err) {
        console.error('Ошибка при загрузке услуг:', err);
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Функция для преобразования features в массив строк
  const getFeaturesList = (features: string | string[]): string[] => {
    if (Array.isArray(features)) {
      return features.filter(item => item.trim());
    }
    return features.split('\n').filter(item => item.trim());
  };

  if (loading) {
    return <div className={s.loading}>Загрузка услуг...</div>;
  }

  if (error) {
    return <div className={s.error}>Ошибка: {error}</div>;
  }

  return (
    <section className={s.servicesBlock} id="services">
      <div className="container">
        <div className={s.servicesCardBlock}>
          {services.map((service, index) => (
            <Fragment key={service.id}>
              <ServiceCard 
                service={{
                  slug: service.id.toString(),
                  title: service.title,
                  list: getFeaturesList(service.features),
                  price: `${service.price} ₽`,
                  button: "Подробнее",
                }} 
              />
              {index !== services.length - 1 && (
                <div className={s.string} aria-hidden="true"></div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}