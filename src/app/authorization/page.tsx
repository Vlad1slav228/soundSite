import "@/styles/reset.scss";
import Header from "@/components/Header/header";
import AuthorizationForm from "@/components/AuthorizationPage/authorization";

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