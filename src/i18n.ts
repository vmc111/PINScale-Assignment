import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            'email': 'Email',
            'password':'Password',
            'emailPlaceholder': 'Enter your Email Id here',
            'passwordPlaceHolder': 'Enter your password here',
            'login': 'Login',
            'admin': 'Admin Login',
            'user': 'User Login'
        }
    }
}

i18n.use(initReactI18next).init({resources, lng:'en' ,fallbackLng: 'en'})

export default i18n