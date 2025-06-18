import accountIcon from "../../../public/PersonalAccount/accountIcon.png";
import leftArrow from "../../../public/PersonalAccount/iconleft.png";
import rightArrow from "../../../public/PersonalAccount/iconRight.png";
import downloadIcon from "../../../public/PersonalAccount/iconDownload.png";

export const ACCOUNT_ICON = accountIcon;
export const ARROW_LEFT = leftArrow;
export const ARROW_RIGHT = rightArrow;
export const DOWNLOAD_ICON = downloadIcon;
export const ACCOUNT_FIRST_NAME = "Anna";
export const ACCOUNT_EMAIL = "a.nur@yandex.ru";
export const WEEKDAYS_DATA = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
export const BOOKING_DATA = [
  {
    bookingsTime: "11:40",
    bookingsTitle: "Запись вокала",
  },
  {
    bookingsTime: "13:00",
    bookingsTitle: "Сведение",
  },
  {
    bookingsTime: "18:20",
    bookingsTitle: "Повторное прослушивание",
  },
];

export const LOGOUT_BUTTON = "Выйти";
export const APPLICATION_TITLE = "Записи";
export const ALL_APPLICATION_BUTTON = "Все";
export const ACTIVE_APPLICATION_BUTTON = "Активные";
export const CANCEL_APPLICATION_BUTTON = "Отменены";

export const SERVICES_DATA = [
    {
    title: "Запись вокала",
    list: [
      "1 час записи",
      "Работа звукорежиссера, а также его помощь и консультация",
    ],
    price: "1 500 ₽",
    button: "Оставить отзыв",
  },
  {
    title: "Базовая обработка",
    list: [
      "Компрессия — не будет слишком громких или тихих звуков",
      "Эквализация — делаем голос более приятным",
      "Пространственная обработка — реверберация, дилей, эхо",
      "Мастеринг — запись будет звучать громче, ярче и убедительней",
    ],
    price: "4 500 ₽",
    button: "Оставить отзыв",
  },
  {
    title: "Сложная обработка",
    list: [
      "Тюнинг вокала — убираем фальшь",
      "Бэк вокал — добавляем подпевки, если это уместно в композиции",
      "Эквализация — делаем голос более приятным",
      "Компрессия — не будет слишком громких или тихих звуков",
      "Сатурация — добавление яркости и пленочных искажений, приятных на слух",
      "Мастеринг — запись будет звучать громче, ярче и убедительней",
      "Вносим не более 10 бесплатных правок",
    ],
    price: "8 500 ₽",
    button: "Оставить отзыв",
  },
]