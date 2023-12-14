import { registerUser } from "../services/userService";
import { useState } from "react";
import Joi from "joi";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const BizzSignUp = () => {
  const [serverError, setServerError] = useState("");
  const { checked } = useAuth();
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
      isBusiness: true,
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
          zip: Joi.number().min(2).max(256).required(),
        },
        isBusiness: Joi.boolean(),
      });
      const { error } = schema.validate(values, { abortEarly: false });
      if (!error) {
        return null;
      }
      const errors = {};
      for (const detail of error.details) {
        // const key = detail.context.key;
        const key = detail.path[detail.path.length - 1];
        errors[key] = detail.message;
        console.log(detail);
      }
      return errors;
    },

    async onSubmit(values) {
      console.log(values);

      try {
        const response = await registerUser(values);
        console.log(response);
        navigate("/");
      } catch (err) {
        if (err.response?.status === 400) {
          setServerError(err.response.data);
        }
      }
    },
  });
  return (
    <main
      className={`form-signin w-100 m-auto pt-5 ${checked ? "" : `bg-dark `} `}
    >
      <form onSubmit={form.handleSubmit} className="pt-5">
        <h1
          className={`h3 mb-3 fw-normal text-center ${
            checked ? "" : `text-light`
          } `}
        >
          Please sign Up business
        </h1>
        {serverError && <div className="alert alert-danger">{serverError}</div>}
        <div className="firstRow d-flex justify-content-center pt-3">
          <div className="form-floating pt-3 ">
            <input
              {...form.getFieldProps("name.first")}
              type="text"
              className="form-control"
              placeholder="First name text-dark"
              required
            />
            <span className="text-danger fs-6">
              {form.touched.name?.first && form.errors.first}
            </span>
            <label htmlFor="floatingPassword">First name</label>
          </div>

          <div className="form-floating pt-3 mx-4 ">
            <input
              {...form.getFieldProps("name.last")}
              type="text"
              className="form-control"
              placeholder="Last name"
              required
            />
            <span className="text-danger fs-6">
              {form.touched.name?.last && form.errors.last}
            </span>
            <label htmlFor="floatingPassword">Last name</label>
          </div>

          <div className="form-floating pt-2">
            <input
              {...form.getFieldProps("email")}
              type="email"
              className="form-control"
              placeholder="name@example.com"
              required
            />
            <span>{form.touched.email && form.errors.email}</span>
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
            />
            <span className="text-danger fs-6">
              {form.touched.password && form.errors.password}
            </span>
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-floating pt-3 mx-4">
            <input
              {...form.getFieldProps("phone")}
              type="text"
              className="form-control"
              placeholder="Phone"
              required
            />
            <span className="text-danger fs-6">
              {form.touched.phone && form.errors.phone}
            </span>
            <label htmlFor="floatingPassword">Phone</label>
          </div>

          <div className="form-floating pt-3">
            <input
              {...form.getFieldProps("image.url")}
              type="text"
              className="form-control"
              placeholder="Image"
              required
            />
            <span className="text-danger fs-6">
              {form.touched.image?.url && form.errors.url}
            </span>
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
            />
            <span className="text-danger fs-6">
              {form.touched.address?.country && form.errors.country}
            </span>
            <label htmlFor="floatingPassword">Country</label>
          </div>

          <div className="form-floating pt-3 mx-4">
            <input
              {...form.getFieldProps("address.city")}
              type="text"
              className="form-control"
              placeholder="City"
              required
            />
            <span className="text-danger fs-6">
              {form.touched.address?.city && form.errors.city}
            </span>
            <label htmlFor="floatingPassword">City</label>
          </div>

          <div className="form-floating pt-3">
            <input
              {...form.getFieldProps("address.street")}
              type="text"
              className="form-control"
              placeholder="Street"
              required
            />
            <span className="text-danger fs-6">
              {form.touched.address?.street && form.errors.street}
            </span>
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
            />
            <span className="text-danger fs-6">
              {form.touched.address?.houseNumber && form.errors.houseNumber}
            </span>
            <label htmlFor="floatingPassword">House Number</label>
          </div>

          <div className="form-floating pt-3">
            <input
              {...form.getFieldProps("address.zip")}
              type="text"
              className="form-control"
              placeholder="Zip"
              required
            />
            <span className="text-danger fs-6">
              {form.touched.address?.zip && form.errors.zip}
            </span>
            <label htmlFor="floatingPassword">Zip</label>
          </div>
        </div>

        <div className=" d-flex justify-content-center py-5">
          <button
            disabled={!form.isValid}
            className="btn btn-primary w-25 py-2 "
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </main>
    // <main className="form-signin w-100 m-auto pt-5">
    //   <form onSubmit={form.handleSubmit} className="pt-5">
    //     <h1 className="h3 mb-3 fw-normal text-center">sign Up business</h1>
    //     {serverError && <div className="alert alert-danger">{serverError}</div>}
    //     <div className="firstRow d-flex justify-content-center pt-3">
    //       <div className="form-floating pt-3 ">
    //         <input
    //           {...form.getFieldProps("name.first")}
    //           type="text"
    //           className="form-control"
    //           placeholder="First name"
    //           required
    //         />
    //         <span className="text-danger fs-6">
    //           {form.touched.name?.first && form.errors.first}
    //         </span>
    //         <label htmlFor="floatingPassword">First name</label>
    //       </div>

    //       <div className="form-floating pt-3 mx-4 ">
    //         <input
    //           {...form.getFieldProps("name.last")}
    //           type="text"
    //           className="form-control"
    //           placeholder="Last name"
    //           required
    //         />
    //         <span className="text-danger fs-6">
    //           {form.touched.name?.last && form.errors.last}
    //         </span>
    //         <label htmlFor="floatingPassword">Last name</label>
    //       </div>

    //       <div className="form-floating pt-2">
    //         <input
    //           {...form.getFieldProps("email")}
    //           type="email"
    //           className="form-control"
    //           placeholder="name@example.com"
    //           required
    //         />
    //         <span>{form.touched.email && form.errors.email}</span>
    //         <label htmlFor="floatingInput">Email address</label>
    //       </div>
    //     </div>
    //     <div className="secondRow d-flex justify-content-center pt-3">
    //       <div className="form-floating pt-2">
    //         <input
    //           {...form.getFieldProps("password")}
    //           type="password"
    //           className="form-control"
    //           placeholder="Password"
    //           required
    //         />
    //         <span className="text-danger fs-6">
    //           {form.touched.password && form.errors.password}
    //         </span>
    //         <label htmlFor="floatingPassword">Password</label>
    //       </div>

    //       <div className="form-floating pt-3 mx-4">
    //         <input
    //           {...form.getFieldProps("phone")}
    //           type="text"
    //           className="form-control"
    //           placeholder="Phone"
    //           required
    //         />
    //         <span className="text-danger fs-6">
    //           {form.touched.phone && form.errors.phone}
    //         </span>
    //         <label htmlFor="floatingPassword">Phone</label>
    //       </div>

    //       <div className="form-floating pt-3">
    //         <input
    //           {...form.getFieldProps("image.url")}
    //           type="text"
    //           className="form-control"
    //           placeholder="Image"
    //           required
    //         />
    //         <span className="text-danger fs-6">
    //           {form.touched.image?.url && form.errors.url}
    //         </span>
    //         <label htmlFor="floatingPassword">Image</label>
    //       </div>
    //     </div>
    //     <div className="thirdRow d-flex justify-content-center pt-3">
    //       <div className="form-floating pt-3">
    //         <input
    //           {...form.getFieldProps("address.country")}
    //           type="text"
    //           className="form-control"
    //           placeholder="Country"
    //           required
    //         />
    //         <span className="text-danger fs-6">
    //           {form.touched.address?.country && form.errors.country}
    //         </span>
    //         <label htmlFor="floatingPassword">Country</label>
    //       </div>

    //       <div className="form-floating pt-3 mx-4">
    //         <input
    //           {...form.getFieldProps("address.city")}
    //           type="text"
    //           className="form-control"
    //           placeholder="City"
    //           required
    //         />
    //         <span className="text-danger fs-6">
    //           {form.touched.address?.city && form.errors.city}
    //         </span>
    //         <label htmlFor="floatingPassword">City</label>
    //       </div>

    //       <div className="form-floating pt-3">
    //         <input
    //           {...form.getFieldProps("address.street")}
    //           type="text"
    //           className="form-control"
    //           placeholder="Street"
    //           required
    //         />
    //         <span className="text-danger fs-6">
    //           {form.touched.address?.street && form.errors.street}
    //         </span>
    //         <label htmlFor="floatingPassword">Street</label>
    //       </div>
    //     </div>
    //     <div className="lastRow d-flex justify-content-center pt-3">
    //       <div className="form-floating pt-3 mx-4">
    //         <input
    //           {...form.getFieldProps("address.houseNumber")}
    //           type="number"
    //           className="form-control"
    //           placeholder="House number"
    //           required
    //         />
    //         <span className="text-danger fs-6">
    //           {form.touched.address?.houseNumber && form.errors.houseNumber}
    //         </span>
    //         <label htmlFor="floatingPassword">House Number</label>
    //       </div>

    //       <div className="form-floating pt-3">
    //         <input
    //           {...form.getFieldProps("address.zip")}
    //           type="text"
    //           className="form-control"
    //           placeholder="Zip"
    //           required
    //         />
    //         <span className="text-danger fs-6">
    //           {form.touched.address?.zip && form.errors.zip}
    //         </span>
    //         <label htmlFor="floatingPassword">Zip</label>
    //       </div>
    //     </div>
    //     <div className="form-check text-start my-3">
    //       <input
    //         className="form-check-input"
    //         type="checkbox"
    //         value="remember-me"
    //         id="flexCheckDefault"
    //       />
    //       <label className="form-check-label" htmlFor="flexCheckDefault">
    //         Remember me
    //       </label>
    //     </div>
    //     <div className=" d-flex justify-content-center">
    //       <button
    //         disabled={!form.isValid}
    //         className="btn btn-primary w-25 py-2"
    //         type="submit"
    //       >
    //         Sign Up
    //       </button>
    //     </div>
    //   </form>
    // </main>
  );
};
export default BizzSignUp;
