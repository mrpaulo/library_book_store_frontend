import * as Yup from 'yup';
import { MAX_SIZE_ADDRESS_CEP,
   MAX_SIZE_ADDRESS_NUMBER,
   MAX_SIZE_CNPJ, 
   MAX_SIZE_CPF, 
   MAX_SIZE_LONG_TEXT, 
   MAX_SIZE_NAME, 
   MAX_SIZE_SHORT_TEXT } from './constants';

   export const validationDateFilterSchema = Yup.object().shape({
    startDate: Yup.date().max(new Date(), "errors.start_date_after"),
    finalDate: Yup.date().test('finalDate', 'errors.end_date_before', function (value) {
      const startDate = this.resolve(Yup.ref('startDate')) as Date | undefined;
      if (startDate && value) {
        const dayAfter = new Date(startDate.getTime() + 86400000);
        return value >= dayAfter;
      }
      return true;
    }),
  });  

export const validationAddressSchema = Yup.object().shape({
  name: Yup.string()
    .max(MAX_SIZE_NAME, "errors.too_long")
    .required("errors.name_required"),
  neighborhood: Yup.string()
    .max(MAX_SIZE_NAME, "errors.too_long"),
  number: Yup.string()
    .max(MAX_SIZE_ADDRESS_NUMBER, "errors.too_long"),
  referencialPoint: Yup.string()
    .max(MAX_SIZE_SHORT_TEXT, "errors.too_long"),
  cep: Yup.string()
    .max(MAX_SIZE_ADDRESS_CEP, "errors.too_long"),
}); 

export const validationAuthorSchema = Yup.object().shape({
  name: Yup.string()
    .max(MAX_SIZE_NAME, "errors.too_long")
    .required("errors.name_required"),
  birthdate: Yup.date()
    .max(new Date(), "errors.start_date_after")
    .required("errors.birthdate_required"),
  description: Yup.string()
    .max(MAX_SIZE_LONG_TEXT, "errors.too_long"),
  email: Yup.string()
    .max(MAX_SIZE_NAME, "errors.too_long")
});

export const validationBookSchema = Yup.object().shape({
  title: Yup.string()
    .max(MAX_SIZE_NAME, "errors.too_long")
    .required("errors.title_required"),
  authors: Yup.array()
    .min(1, "errors.at_least_one")
    .required(),
  publisher: Yup.object()
    .required("errors.publisher_required"),
  subtitle: Yup.string()
    .max(MAX_SIZE_NAME, "errors.too_long"),
  review: Yup.string()
    .max(MAX_SIZE_LONG_TEXT, "errors.too_long"),
  link: Yup.string()
    .max(MAX_SIZE_SHORT_TEXT, "errors.too_long")
});

export const validationPublisherSchema = Yup.object().shape({
  name: Yup.string()
    .max(MAX_SIZE_NAME, "errors.too_long")
    .required("errors.name_required"),
  cnpj: Yup.string()
    .max(MAX_SIZE_CNPJ, "errors.too_long")
    .required("errors.cnpj_required"),
  description: Yup.string()
  .max(MAX_SIZE_LONG_TEXT, "errors.too_long")
});

export const validationUserSchema = Yup.object().shape({
  name: Yup.string()
    .max(MAX_SIZE_NAME, "errors.too_long"),
  cpf: Yup.string()
    .max(MAX_SIZE_CPF, "errors.too_long"),
  email: Yup.string()
    .max(MAX_SIZE_NAME, "errors.too_long")
});

export const validationLoginSchema = Yup.object().shape({
  username: Yup.string()
    .max(MAX_SIZE_NAME, "errors.too_long")
    .required("errors.username_required"),
  password: Yup.string()
    .max(MAX_SIZE_NAME, "errors.too_long")
    .required("errors.password_required"),
  repeatPassword: Yup.string()
    .max(MAX_SIZE_NAME, "errors.too_long")
    .required("errors.repeat_password_required")
});