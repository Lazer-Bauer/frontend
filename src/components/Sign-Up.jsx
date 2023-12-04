import { registerUser } from "../services/userService";
import { useState } from "react";
import Joi from "joi";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  // const { user, signUp } = useAuth();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: { first: "", middle: "", last: "" },
      email: "",
      password: "",
      phone: "",
      image: { url: "", alt: "profile" },
      address: {
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        zip: "",
      },
      isBusiness: false,
    },
    validate(values) {
      const schema = Joi.object({
        name: Joi.object({
          first: Joi.string().min(2).max(256).required(),
          middle: Joi.string().allow("", null).max(256).optional(),
          last: Joi.string().min(2).max(256).required(),
        }),
        phone: Joi.string().min(9).max(11).required(),
        image: {
          url: Joi.string().uri().min(14).required(),
          alt: Joi.string().min(2).max(256),
        },
        email: Joi.string()
          .min(5)
          .required()
          .email({ tlds: { allow: false } }),
        password: Joi.string()
          .min(8)
          .max(20)
          .required()
          .pattern(new RegExp("(?=.[0-9])"))
          .pattern(new RegExp("(?=.*[A-Z])"))
          .pattern(new RegExp("(?=.*[a-z])"))
          .pattern(new RegExp("[!@#$%^&]")),
        address: {
          country: Joi.string().min(2).max(256).required(),
          city: Joi.string().min(2).max(256).required(),
          street: Joi.string().min(2).max(256).required(),
          houseNumber: Joi.number().min(2).max(256).required(),
          zip: Joi.string().min(2).max(256).required(),
        },
        isBusiness: Joi.boolean(),
      });
      const { error } = schema.validate(values, { abortEarly: false });
      console.log(error);
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
    },

    async onSubmit(values) {
      console.log(values);

      try {
        const response = await registerUser(values);
        console.log(response);
      } catch (err) {
        if (err.response?.status === 400) {
          setServerError(err.response.data);
        }
      }
    },
  });
  return (
    <main className="form-signin w-100 m-auto pt-5">
      <form onSubmit={form.handleSubmit} className="pt-5">
        <h1 className="h3 mb-3 fw-normal text-center">Please sign Up</h1>
        {serverError && <div className="alert alert-danger">{serverError}</div>}
        <div className="firstRow d-flex justify-content-center pt-3">
          <div className="form-floating pt-3 ">
            <input
              {...form.getFieldProps("name.first")}
              type="text"
              className="form-control"
              placeholder="First name"
              required
            />
            <span className="invalid-feedback">{form.errors.first}</span>
            <label htmlFor="floatingPassword">First name</label>
          </div>

          <div className="form-floating pt-3 mx-4 ">
            <input
              {...form.getFieldProps("name.last")}
              type="text"
              className="form-control"
              placeholder="Last name"
              required
              error={form.touched.last && form.errors.last}
            />
            <label htmlFor="floatingPassword">Last name</label>
          </div>

          <div className="form-floating pt-2">
            <input
              {...form.getFieldProps("email")}
              type="email"
              className="form-control"
              placeholder="name@example.com"
              required
              error={form.touched.email && form.errors.email}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
        </div>
        <div className="secondRow d-flex justify-content-center pt-3">
          <div className="form-floating pt-2">
            <input
              {...form.getFieldProps("password")}
              type="password"
              className="form-control"
              placeholder="Password"
              required
              error={form.touched.password && form.errors.password}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-floating pt-3 mx-4">
            <input
              {...form.getFieldProps("phone")}
              type="text"
              className="form-control"
              placeholder="Phone"
              required
              error={form.touched.phone && form.errors.phone}
            />
            <label htmlFor="floatingPassword">Phone</label>
          </div>

          <div className="form-floating pt-3">
            <input
              {...form.getFieldProps("image.url")}
              type="text"
              className="form-control"
              placeholder="Image"
              required
              error={form.touched.url && form.errors.url}
            />
            <label htmlFor="floatingPassword">Image</label>
          </div>
        </div>
        <div className="thirdRow d-flex justify-content-center pt-3">
          <div className="form-floating pt-3">
            <input
              {...form.getFieldProps("address.country")}
              type="text"
              className="form-control"
              placeholder="Country"
              required
              error={form.touched.country && form.errors.country}
            />
            <label htmlFor="floatingPassword">Country</label>
          </div>

          <div className="form-floating pt-3 mx-4">
            <input
              {...form.getFieldProps("address.city")}
              type="text"
              className="form-control"
              placeholder="City"
              required
              error={form.touched.city && form.errors.city}
            />
            <label htmlFor="floatingPassword">City</label>
          </div>

          <div className="form-floating pt-3">
            <input
              {...form.getFieldProps("address.street")}
              type="text"
              className="form-control"
              placeholder="Street"
              required
              error={form.touched.street && form.errors.street}
            />
            <label htmlFor="floatingPassword">Street</label>
          </div>
        </div>
        <div className="lastRow d-flex justify-content-center pt-3">
          <div className="form-floating pt-3 mx-4">
            <input
              {...form.getFieldProps("address.houseNumber")}
              type="number"
              className="form-control"
              placeholder="House number"
              required
              error={form.touched.houseNumber && form.errors.houseNumber}
            />
            <label htmlFor="floatingPassword">House Number</label>
          </div>

          <div className="form-floating pt-3">
            <input
              {...form.getFieldProps("address.zip")}
              type="text"
              className="form-control"
              placeholder="Zip"
              required
              error={form.touched.zip && form.errors.zip}
            />
            <label htmlFor="floatingPassword">Zip</label>
          </div>
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
        <div className=" d-flex justify-content-center">
          <button
            disabled={!form.isValid}
            className="btn btn-primary w-25 py-2"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </main>
  );
};
export default SignUp;
