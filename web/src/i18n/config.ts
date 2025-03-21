import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import env from '../config/env';

// English translations
const enTranslations = {
  common: {
    tryAgain: 'Try Again',
    language: 'Language:'
  },
  loanDashboard: {
    title: 'Loan Payment Dashboard',
    loanList: {
      title: 'Existing Loans & Payments',
      columns: {
        loanId: 'Loan ID',
        loanName: 'Loan Name',
        principal: 'Principal Amount',
        interestRate: 'Interest Rate',
        dueDate: 'Due Date',
        paymentDate: 'Payment Date',
        status: 'Status'
      },
      noPayment: '-',
      status: {
        onTime: 'On Time',
        late: 'Late',
        defaulted: 'Defaulted',
        unpaid: 'Unpaid'
      }
    },
    paymentForm: {
      title: 'Add New Payment',
      fields: {
        loanId: 'Loan ID',
        loanIdPlaceholder: 'Enter Loan ID',
        amount: 'Payment Amount',
        amountPlaceholder: '0.00'
      },
      currency: 'UGX',
      submit: 'Add Payment',
      processing: 'Processing...',
      success: 'Payment of {{currency}} {{amount}} added successfully!',
      errors: {
        loanIdRequired: 'Loan ID is required',
        invalidAmount: 'Please enter a valid payment amount',
        genericError: 'An error occurred while submitting the payment'
      }
    },
    loanDetails: {
      title: 'Loan Details',
      principal: 'Principal Amount',
      interestRate: 'Interest Rate',
      dueDate: 'Due Date',
      status: 'Status',
      description: 'Description',
      paymentHistory: 'Payment History',
      noPayments: 'No payments have been recorded for this loan.',
      paymentSummary: 'Payment Summary',
      totalDue: 'Total Amount Due',
      totalPaid: 'Total Amount Paid',
      remainingAmount: 'Remaining Amount'
    }
  }
};

// Luganda translations
const lgTranslations = {
  common: {
    tryAgain: 'Gezaako Omulundi Omulala',
    language: 'Olulimi:'
  },
  loanDashboard: {
    title: 'Ekitebe ky\'Emisaala y\'Amabanja',
    loanList: {
      title: 'Amabanja n\'Emisaala Egiriwo',
      columns: {
        loanId: 'ID y\'Ebbanja',
        loanName: 'Erinnya ly\'Ebbanja',
        principal: 'Omuwendo gw\'Ensimbi',
        interestRate: 'Ekivaamu ku buli 100',
        dueDate: 'Ennaku y\'Okusasula',
        paymentDate: 'Ennaku Eyasasulibwako',
        status: 'Embeera'
      },
      noPayment: '-',
      status: {
        onTime: 'Ku Budde',
        late: 'Yatuuse Oluvannyuma',
        defaulted: 'Teyasasulwa',
        unpaid: 'Tesasuddwa'
      }
    },
    paymentForm: {
      title: 'Yongerako Okusasula Okupya',
      fields: {
        loanId: 'ID y\'Ebbanja',
        loanIdPlaceholder: 'Yingiza ID y\'Ebbanja',
        amount: 'Omuwendo gw\'Okusasula',
        amountPlaceholder: '0.00'
      },
      currency: 'UGX',
      submit: 'Okusasula',
      processing: 'Kikola...',
      success: 'Okusasula kwa {{currency}} {{amount}} kuwedde bulungi!',
      errors: {
        loanIdRequired: 'ID y\'Ebbanja yetaagisa',
        invalidAmount: 'Yingiza omuwendo omutuufu ogw\'okusasula',
        genericError: 'Waliwo kizibu mu kusasula'
      }
    },
    loanDetails: {
      title: 'Ebikwata ku Bbanja',
      principal: 'Omuwendo gw\'Ensimbi',
      interestRate: 'Ekivaamu ku buli 100',
      dueDate: 'Ennaku y\'Okusasula',
      status: 'Embeera',
      description: 'Okunnyonnyola',
      paymentHistory: 'Ebyafaayo by\'Okusasula',
      noPayments: 'Tewali kusasula kwawandiikibwa ku bbanja lino.',
      paymentSummary: 'Okufunza Okusasula',
      totalDue: 'Ensimbi Zonna Ezeetaagibwa',
      totalPaid: 'Ensimbi Zonna Ezisasuddwa',
      remainingAmount: 'Ensimbi Ezisigaddeyo'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      lg: { translation: lgTranslations }
    },
    fallbackLng: 'en',
    debug: env.isDevelopment,
    interpolation: {
      escapeValue: false // React already escapes everything
    }
  });

export default i18n;
