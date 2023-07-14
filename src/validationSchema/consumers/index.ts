import * as yup from 'yup';

export const consumerValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
});
