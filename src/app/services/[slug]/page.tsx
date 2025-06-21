import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { notFound } from "next/navigation";
import IntroService from "@/components/ServicesPage/BasicProcessing/Intro/intro";
import Header from "@/components/Header/header";
import MusicExamplesServices from "@/components/ServicesPage/MusicExamples/musicExamples";
import Reviews from "@/components/Reviews/reviews";
import Footer from "@/components/Footer/footer";

interface Service {
  id: number;
  price: number;
  title: string;
  features: string | string[];
  duration_min: number;
  is_active: boolean;
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) 
{
    const { slug } = await params; 
  try {
    const res = await fetchWithAuth(`/api/v1/services/${slug}/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return notFound();
    }

    const service: Service = await res.json();

    if (!service.is_active) {
      return notFound();
    }

    const getFeaturesList = (features: string | string[]): string[] => {
      if (Array.isArray(features)) {
        return features.filter((item) => item.trim());
      }
      return features.split("\n").filter((item) => item.trim());
    };

    const serviceData = {
       id: service.id, 
      slug,
      title: service.title,
      list: getFeaturesList(service.features),
      price: `${service.price} ₽`,
      button: "Оставить заявку",
    };

    return (
      <>
        <Header />
        <main>
          <IntroService service={serviceData} />
          <MusicExamplesServices />
          <Reviews />
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    console.error("Error fetching service:", error);
    return notFound();
  }
}
