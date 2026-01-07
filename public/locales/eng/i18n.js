import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  uz: { translation: { 
    name: "Ism", surname: "Familiya", phone: "Telefon", email: "Email",
    password: "Parol", submit: "Yuborish", formTitle: "Foydalanuvchi Formasi",
    langUz: "O'zbekcha", langEn: "Inglizcha", langRu: "Ruscha",
    male: "O‘g‘il", female: "Qiz", selectGender: "Jinsni tanlang",
    selectProductCount: "Mahsulot sonini tanlang", enterAddress: "Manzil kiriting",
    home: "Bosh sahifa", coffee: "Qahva", tea: "Choy", dessert: "Shirinlik",
    logout: "Chiqish"
  }},
  en: { translation: { 
    name: "Name", surname: "Surname", phone: "Phone", email: "Email",
    password: "Password", submit: "Submit", formTitle: "User Form",
    langUz: "Uzbek", langEn: "English", langRu: "Russian",
    male: "Male", female: "Female", selectGender: "Select gender",
    selectProductCount: "Select product count", enterAddress: "Enter address",
    home: "Home", coffee: "Coffee", tea: "Tea", dessert: "Dessert",
    logout: "Logout"
  }},
  ru: { translation: { 
    name: "Имя", surname: "Фамилия", phone: "Телефон", email: "Почта",
    password: "Пароль", submit: "Отправить", formTitle: "Форма пользователя",
    langUz: "Узбекский", langEn: "Английский", langRu: "Русский",
    male: "Мужской", female: "Женский", selectGender: "Выберите пол",
    selectProductCount: "Выберите количество товара", enterAddress: "Введите адрес",
    home: "Главная", coffee: "Кофе", tea: "Чай", dessert: "Десерт",
    logout: "Выйти"
  }},
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "uz",
  interpolation: { escapeValue: false },
});

export default i18n;
