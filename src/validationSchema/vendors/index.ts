import * as yup from 'yup';

export const vendorValidationSchema = yup.object().shape({
  service_offering: yup.string().required(),
  availability: yup.string().required(),
  user_id: yup.string().nullable(),
});
