import "@/styles/reset.scss";
import Header from "@/components/Header/header";
import AuthorizationForm from "@/components/AuthorizationPage/authorization";

export async function generateMetadata() {
  return {
    title: "Вход в аккаунт — Sound",
    description:
      "Войдите в личный кабинет студии звукозаписи Sound, чтобы управлять своими записями и услугами.",
  };
}

export default function Authorization() {
  return (
    <>
      <Header />
      <main>
        <AuthorizationForm />
      </main>
    </>
  );
}
