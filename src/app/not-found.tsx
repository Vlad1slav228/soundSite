import NotFound from "@/components/NotFoundPage/notFound";
import "@/styles/reset.scss";

export async function generateMetadata() {
  return {
    title: "Страница не найдена — Sound",
    description:
      "Запрошенная страница не найдена. Попробуйте вернуться на главную.",
  };
}

export default function NotFoundPage() {
  return <NotFound />;
}
