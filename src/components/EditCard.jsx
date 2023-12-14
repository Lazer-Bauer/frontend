import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { createCard, editCard, getCard } from "../services/cardServices";
import { useCard } from "../Hooks/useCard";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/auth.context";
const EditCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [card, setCard] = useState();
  const { checked } = useAuth();
  const [serverError, setServerError] = useState("");
  useEffect(() => {
    getCard(id).then((response) => setCard(response.data));
  }, [id]);
  const form = useFormik({
    validateOnMount: true,
    enableReinitialize: true, // Add this line
    initialValues: {
      title: card?.title,
      subtitle: card?.subtitle,
      description: card?.description,
      phone: card?.phone,
      email: card?.email,
      web: card?.web,
      image: { url: card?.image.url, alt: "picture" },
      address: {
        country: card?.address.country,
        city: card?.address.city,
        street: card?.address.street,
        houseNumber: card?.address.houseNumber,
        zip: card?.address.zip,
      },
    },

    validate(values) {
      const schema = Joi.object({
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

      const { error } = schema.validate(values, { abortEarly: false });
      console.log(error);
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
        const response = await editCard(values);
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
    <main
      className={`form-signin w-100 m-auto pt-5 ${checked ? "" : `bg-dark`}`}
    >
      <form onSubmit={form.handleSubmit} className="pt-5">
        <h1
          className={`h3 mb-3 fw-normal text-center ${
            checked ? "" : `text-light`
          } `}
        >
          Edit Card
        </h1>
        <div className="firstRow d-flex justify-content-center pt-3">
          <div className="form-floating pt-3 ">
            <input
              {...form.getFieldProps("title")}
              type="text"
              className="form-control"
              placeholder="title"
              required
            />
            <span className="text-danger fs-6">
              {form.touched.title && form.errors.title}
            </span>
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
            <span className="text-danger fs-6">
              {form.touched.subtitle && form.errors.subtitle}
            </span>
            <label htmlFor="floatingPassword">Subtitle</label>
          </div>

          <div className="form-floating pt-2">
            <input
              {...form.getFieldProps("description")}
              type="text"
              className="form-control"
              placeholder="description"
              required
            />
            <span className="text-danger fs-6">
              {form.touched.description && form.errors.description}
            </span>
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
            />
            <span className="text-danger fs-6">
              {form.touched.email && form.errors.email}
            </span>
            <label htmlFor="floatingPassword">Email</label>
          </div>
          <div className="form-floating pt-2 mx-4">
            <input
              {...form.getFieldProps("phone")}
              type="tel"
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
            />
            <label htmlFor="floatingPassword">Zip</label>
          </div>
          <div className="form-floating pt-3 mx-4">
            <input
              {...form.getFieldProps("web")}
              type="text"
              className="form-control"
              placeholder="web"
            />
            <span className="text-danger fs-6">
              {form.touched.web && form.errors.web}
            </span>
            <label htmlFor="floatingPassword">Web</label>
          </div>
        </div>

        <div className=" d-flex justify-content-center pt-5 pb-5">
          <button
            disabled={!form.isValid}
            className="btn btn-primary w-25 py-3 "
            type="submit"
          >
            Edit Card
          </button>
        </div>
      </form>
    </main>
  );
};
export default EditCard;
