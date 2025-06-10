import {
  FORM_TITLE,
  MICROPHONE_IMG,
  REQUIRED_MARK,
  REVIEW_PLACEHOLDER,
  SEND_BUTTON,
} from "@/mocks/AddReviewPage/addReview";
import s from "./addReview.module.scss";
import Image from "next/image";

export default function AddReviewForm() {
  return (
    <section className={s.addReviewBlock}>
      <div className={`container ${s.addReviewGroup}`}>
        <form className={s.callbackForm}>
          <h1>{FORM_TITLE}</h1>
            <div className={s.inputGroup}>
              <div className={s.inputWrapper}>
                <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                <input type="text" placeholder={REVIEW_PLACEHOLDER} required />
              </div>
              <div className={s.inputUnderline}></div>
            </div>
            <button type="submit" className="greenButton">{SEND_BUTTON}</button>
        </form>
        <Image src={MICROPHONE_IMG} alt="Микрофон" />
      </div>
    </section>
  );
}