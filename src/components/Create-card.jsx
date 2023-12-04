import { useFormik } from "formik";
import { useState, useNavigate } from "react";
import Joi from "joi";
import { createCard } from "../services/cardServices";
const CreateCard = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const form = useFormik({
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      image: { url: "", alt: "picture" },
      address: { country: "", city: "", street: "", houseNumber: "" },
    },

    validate(values) {
      const sechma = Joi.object({
        title: Joi.string().min(2).max(256).required(),
        subtitle: Joi.string().min(2).max(256).required(),
        description: Joi.string().min(2).max(1024).required(),
        phone: Joi.string().min(9).max(11).required(),
        email: Joi.string().min(5).required(),
        web: Joi.string().min(14),
        image: { url: Joi.string().min(14), alt: Joi.string().min(2).max(256) },
        address: {
          country: Joi.string().required(),
          city: Joi.string().required(),
          street: Joi.string().required(),
          houseNumber: Joi.number().min(1).required(),
          zip: Joi.number().required(),
        },
      });

      //   const { error } = schema.validate(values, { abortEarly: false });
      //   console.log(error);
      //   if (error) {
      //     return error.details.reduce((errors, detail) => {
      //       return { ...errors, [detail.path[0]]: detail.message };
      //     }, {});
      //   }
    },
    async onSubmit(values) {
      console.log(values);

      try {
        const response = await createCard(values);
        console.log(response);
        navigate("/my-cards");
      } catch (err) {
        console.log(err);
        if (err.response?.status === 400) {
          setServerError(err.response.data);
        }
      }
    },
  });

  return (
    <main className="form-signin w-100 m-auto pt-5">
      <form onSubmit={form.handleSubmit} className="pt-5">
        <h1 className="h3 mb-3 fw-normal text-center">Create Card</h1>
        {/* {serverError && <div className="alert alert-danger">{serverError}</div>} */}
        <div className="firstRow d-flex justify-content-center pt-3">
          <div className="form-floating pt-3 ">
            <input
              {...form.getFieldProps("title")}
              type="text"
              className="form-control"
              placeholder="title"
              required
            />
            <label htmlFor="floatingPassword">Title</label>
          </div>

          <div className="form-floating pt-3 mx-4 ">
            <input
              {...form.getFieldProps("subtitle")}
              type="text"
              className="form-control"
              placeholder="subtitle"
              required
            />
            <label htmlFor="floatingPassword">Subtitle</label>
          </div>

          <div className="form-floating pt-2">
            <input
              {...form.getFieldProps("description")}
              type="text"
              className="form-control"
              placeholder="description"
              required
              error={form.touched.email && form.errors.email}
            />
            <label htmlFor="floatingInput">Description</label>
          </div>
        </div>
        <div className="secondRow d-flex justify-content-center pt-3">
          <div className="form-floating pt-2">
            <input
              {...form.getFieldProps("email")}
              type="email"
              className="form-control"
              placeholder="Email"
              required
              error={form.touched.password && form.errors.password}
            />
            <label htmlFor="floatingPassword">Email</label>
          </div>
          <div className="form-floating pt-2">
            <input
              {...form.getFieldProps("phone")}
              type="tel"
              className="form-control"
              placeholder="Phone"
              required
              error={form.touched.password && form.errors.password}
            />
            <label htmlFor="floatingPassword">Phone</label>
          </div>

          <div className="form-floating pt-3 mx-4">
            <input
              {...form.getFieldProps("web")}
              type="text"
              className="form-control"
              placeholder="web"
              error={form.touched.phone && form.errors.phone}
            />
            <label htmlFor="floatingPassword">Web</label>
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

        <div className=" d-flex justify-content-center pt-5">
          <button
            disabled={!form.isValid}
            className="btn btn-primary w-25 py-2 "
            type="submit"
          >
            Create Card
          </button>
        </div>
      </form>
    </main>
  );
};
export default CreateCard;
