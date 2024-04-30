import * as yup from "yup"

const loginSchema = yup
  .object({
      name: yup.string().min(2).max(30).required(),
      password: yup.string().min(2).required(),
      email: yup.string().email().required(),
  })
  .required()
  export default loginSchema;