import {
  ABOUT_TITLE,
  CONTACTS_TITLE,
  DZEN_ICON,
  EMAIL_PLACEHOLDER,
  EXAMPLES_TITLE,
  FOOTER_LOGO,
  FORM_TITLE,
  MANAGER_PHONE,
  MANAGER_PHONE_TITLE,
  NAME_PLACEHOLDER,
  OK_ICON,
  PHONE_PLACEHOLDER,
  PRIVACY_POLICY_LINK,
  PRIVACY_POLICY_TITLE,
  REQUIRED_MARK,
  REVIEWS_TITLE,
  SERVICES_TITLE,
  STUDIO_PHONE,
  STUDIO_PHONE_TITLE,
  SUBMIT_BUTTON,
  SURNAME_PLACEHOLDER,
  TG_ICON,
  VK_ICON,
  YT_ICON,
} from "@/mocks/MainPage/footer";
import s from "./footer.module.scss";
import Image from "next/image";

export default function FooterMain() {
  return (
    <footer className={s.footer}>
      <section className={s.footerMainSection}>
          <div className={`${s.container} ${s.footerContentWrapper} ${s.footerBlock}`}>
              <aside className={s.footerContentInfo}>
                <nav>
                  <ul className={s.footerList}>
                    <li>
                      <a href="заглушка">{ABOUT_TITLE}</a>
                    </li>
                    <li>
                      <a href="заглушка">{SERVICES_TITLE}</a>
                    </li>
                    <li>
                      <a href="заглушка">{EXAMPLES_TITLE}</a>
                    </li>
                    <li>
                      <a href="заглушка">{REVIEWS_TITLE}</a>
                    </li>
                    <li>
                      <a href="заглушка">{CONTACTS_TITLE}</a>
                    </li>
                  </ul>
                </nav>
                <div className={s.сontactInfoBlock}>
                  <div className={s.contactInfo}>
                    <div>
                      <p>{STUDIO_PHONE_TITLE}</p>
                      <a href="tel:+79913991337">{STUDIO_PHONE}</a>
                    </div>
                    <div>
                      <p>{MANAGER_PHONE_TITLE}</p>
                      <a href="tel:+79162699881">{MANAGER_PHONE}</a>
                    </div>
                  </div>
                  <div>
                    <ul className={s.socialLinksList}>
                      <li>
                        <a href="заглушка">
                          <Image src={VK_ICON} alt="Вконтакте" />
                        </a>
                      </li>
                      <li>
                        <a href="заглушка">
                          <Image src={TG_ICON} alt="Телеграм" />
                        </a>
                      </li>
                      <li>
                        <a href="заглушка">
                          <Image src={YT_ICON} alt="Ютуб" />
                        </a>
                      </li>
                      <li>
                        <a href="заглушка">
                          <Image src={DZEN_ICON} alt="Дзен" />
                        </a>
                      </li>
                      <li>
                        <a href="заглушка">
                          <Image src={OK_ICON} alt="Одноклассники" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>
              <form className={s.callbackForm} action="#" method="post">
                <h2>{FORM_TITLE}</h2>
                <div className={s.formFieldsGroup}>
                  <div className={s.formFields}>
                    <div className={s.formField}>
                      <div className={s.inputGroup}>
                        <div>
                          <span className={s.requiredMark}>
                            {REQUIRED_MARK}
                          </span>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder={NAME_PLACEHOLDER}
                            required
                          />
                        </div>
                        <div className={s.inputUnderline}></div>
                      </div>
                      {/* <p style={{ color: "white" }}>Ошибка</p> */}
                    </div>

                    <div className={s.formField}>
                      <div className={s.inputGroup}>
                        <div>
                          <span className={s.requiredMark}>
                            {REQUIRED_MARK}
                          </span>
                          <input
                            type="text"
                            name="surname"
                            id="surname"
                            placeholder={SURNAME_PLACEHOLDER}
                            required
                          />
                        </div>
                        <div className={s.inputUnderline}></div>
                      </div>
                      {/* <p style={{ color: "white" }}>Ошибка</p> */}
                    </div>

                    <div className={s.formField}>
                      <div className={s.inputGroup}>
                        <div>
                          <span className={s.requiredMark}>
                            {REQUIRED_MARK}
                          </span>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            placeholder={PHONE_PLACEHOLDER}
                            required
                          />
                        </div>
                        <div className={s.inputUnderline}></div>
                      </div>
                      {/* <p style={{ color: "white" }}>Ошибка</p> */}
                    </div>

                    <div className={s.formField}>
                      <div className={s.inputGroup}>
                        <div>
                          <input
                            type="email"
                            name="mail"
                            id="mail"
                            placeholder={EMAIL_PLACEHOLDER}
                          />
                        </div>
                        <div className={s.inputUnderline}></div>
                      </div>
                      {/* <p style={{ color: "white" }}>Ошибка</p> */}
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
                <button type="submit" className={s.submitButton}>
                  {SUBMIT_BUTTON}
                </button>
              </form>
          </div>
        <Image src={FOOTER_LOGO} alt="Логотип SOUND" />
      </section>
    </footer>
  );
}
