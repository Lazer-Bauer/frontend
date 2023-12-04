import { useFormik } from "formik";
import { useState } from "react";
import Joi from "joi";

import {useNavigate} from "react-router-dom"
import { useAuth } from "../context/auth.context";
const SignIn = () => {
  const {user,login}=useAuth();
  const navigate = useNavigate()
  const [serverError, setServerError] = useState("");
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate(values) {
      const schema = Joi.object({
        email: Joi.string()
          .min(5)
          .required()
          .email({ tlds: { allow: false } }),
        password: Joi.string()
          .min(7)
          .max(20)
          .required()
          .pattern(new RegExp("(?=.*[0-9])"))
          .pattern(new RegExp("(?=.*[A-Z])"))
          .pattern(new RegExp("(?=.*[a-z])"))
          .pattern(new RegExp("(?=.*[!@#$%^&])")),
      });
      const { error } = schema.validate(values, { abortEarly: false });
      if (error) {
        return error.details.reduce((errors, detail) => {
          
          if (detail.path[0] === "password") {
            return {
              ...errors,
              password:
                '"password" must contain a lowercase, uppercase, number and one of : !@#$%^&',
            };
          }
          return { ...errors, [detail.path[0]]: detail.message };
        }, {});
      }
      // if (!error) {
      //   return null;
      // }
      // const errors = {};
      // for (const detail of error.details) {
      //   const key = detail.path[0];
      //   errors[key] = detail.message;
      // }
      // return errors;
    },
    async onSubmit(values) {
     

      try {
        const response = await login(values);
        navigate("/")
      } catch (err) {
        if (err.response?.status === 400) {
          setServerError(err.response.data);
        }
      }
    },
  });
  return (
    <main className="form-signin w-25 m-auto pt-5">
      <form onSubmit={form.handleSubmit} className="pt-5">
        <h1 className="h3 mb-3 fw-normal text-center">Please sign in</h1>
         {serverError && <div className="alert alert-danger">{serverError}</div>} 
        <div className="form-floating pt-3">
          <input
          error={form.touched.email && form.errors.email}
            {...form.getFieldProps("email")}
            type="email"
            className="form-control"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating pt-2">
          <input
          error={form.touched.password && form.errors.password}
            {...form.getFieldProps("password")}
            type="password"
            className="form-control"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Remember me
          </label>
        </div>
        <button  disabled={!form.isValid}  className="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>
      </form>
    </main>
  );
};
export default SignIn;
