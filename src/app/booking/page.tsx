import "@/styles/reset.scss";
import Header from "@/components/Header/header";
import BookingForm from "@/components/BookingPage/booking";

export default function Booking() {
  return (
    <>
      <Header />
      <main>
        <BookingForm />
      </main>
    </>
  );
}  