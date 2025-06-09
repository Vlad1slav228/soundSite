import {
  DATA_PLACEHOLDER,
  EMAIL_PLACEHOLDER,
  FORM_TITLE,
  MICROPHONE_IMG,
  NAME_PLACEHOLDER,
  PHONE_PLACEHOLDER,
  PRIVACY_POLICY_LINK,
  PRIVACY_POLICY_TITLE,
  REQUIRED_MARK,
  SURNAME_PLACEHOLDER,
  TIME_PLACEHOLDER,
} from "@/mocks/BookingPage/booking";
import s from "./booking.module.scss";
import Image from "next/image";

export default function BookingForm() {
  return (
    <section className={s.bookingBlock}>
      <div className={`${s.container} ${s.bookingGroup}`}>
        <form className={s.callbackForm}>
          <h1>{FORM_TITLE}</h1>
          <div className={s.formFieldsGroup}>
            <div className={s.formFields}>
              <div className={s.formField}>
                <div className={s.inputGroup}>
                  <div className={s.inputWrapper}>
                    <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                    <input
                      type="text"
                      placeholder={NAME_PLACEHOLDER}
                      required
                    />
                  </div>
                  <div className={s.inputUnderline}></div>
                </div>
              </div>

              <div className={s.formField}>
                <div className={s.inputGroup}>
                  <div className={s.inputWrapper}>
                    <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                    <input
                      type="text"
                      placeholder={SURNAME_PLACEHOLDER}
                      required
                    />
                  </div>
                  <div className={s.inputUnderline}></div>
                </div>
              </div>

              <div className={s.formField}>
                <div className={s.inputGroup}>
                  <div className={s.inputWrapper}>
                    <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                    <input
                      type="tel"
                      placeholder={PHONE_PLACEHOLDER}
                      required
                    />
                  </div>
                  <div className={s.inputUnderline}></div>
                </div>
              </div>

              <div className={s.formField}>
                <div className={s.inputGroup}>
                  <div className={s.inputWrapper}>
                    <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                    <input
                      type="email"
                      placeholder={EMAIL_PLACEHOLDER}
                      required
                    />
                  </div>
                  <div className={s.inputUnderline}></div>
                </div>
              </div>

              <div className={s.formField}>
                <div className={s.inputGroup}>
                  <div className={`${s.inputWrapper} ${s.dataInput}`}>
                    <div>
                      <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                      <input
                        type="date"
                        placeholder={DATA_PLACEHOLDER}
                        required
                      />
                    </div>
                  </div>
                  <div className={s.inputUnderline}></div>
                </div>
              </div>

              <div className={s.formField}>
                <div className={s.inputGroup}>
                  <div className={`${s.inputWrapper} ${s.timeInput}`}>
                    <div>
                      <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                      <input
                        type="time"
                        placeholder={TIME_PLACEHOLDER}
                        required
                      />
                    </div>
                  </div>
                  <div className={s.inputUnderline}></div>
                </div>
              </div>
            </div>

            <div className={s.checkboxWrapper}>
              <input type="checkbox" required />
              <label>
                <span>
                  {PRIVACY_POLICY_TITLE}
                  <a href="заглушка" target="_blank">
                    {PRIVACY_POLICY_LINK}
                  </a>
                </span>
              </label>
            </div>
          </div>
        </form>
        <Image src={MICROPHONE_IMG} alt="Микрофон" />
      </div>
    </section>
  );
}
