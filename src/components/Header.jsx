import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { useState } from "react";

const Header = () => {
  const { user } = useAuth();
  const { checked, setChecked } = useAuth();
  const { search, setSearch } = useAuth();
  const toggle = () => {
    setChecked(!checked);
    console.log(checked);
  };
  const handleInputChange = (event) => {
    setSearch(event.target?.value);
    console.log(search);
  };
  return (
    <header
      className={`p-3 mb-3 border-bottom ${
        checked ? "bg-primary" : `bg-dark text-light`
      } navbar navbar-expand-sm fixed-top z-3`}
    >
      <button
        className="navbar-toggler "
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarsExample03"
        aria-controls="navbarsExample03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExample03">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
            >
              <svg
                className="bi me-2"
                width="40"
                height="32"
                role="img"
                aria-label="Bootstrap"
              ></svg>
            </a>

            <ul
              className={`navbar-nav me-auto mb-2 mb-sm-0  icon-link-hover ${
                checked ? "" : "text-light"
              }`}
            >
              <li>
                <NavLink
                  to="/"
                  href="#"
                  className="nav-link px-2 link-body-emphasis text-light"
                >
                  Home
                </NavLink>
              </li>
              {user?.isBusiness && (
                <>
                  <li>
                    <NavLink
                      to="create-card"
                      className="nav-link px-2 link-body-emphasis text-light"
                    >
                      Create card
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="my-cards"
                      className="nav-link px-2 link-body-emphasis text-light"
                    >
                      My Cards
                    </NavLink>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li>
                    <NavLink
                      to={"/favorites"}
                      className="nav-link px-2 link-body-emphasis text-light"
                    >
                      Favorites
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={"/sign-out"}
                      className="nav-link px-2 link-body-emphasis text-light"
                    >
                      Sign Out
                    </NavLink>
                  </li>
                </>
              )}

              {!user && (
                <>
                  <li>
                    <NavLink
                      to={"/sign-up"}
                      className="nav-link px-2 link-body-emphasis text-light"
                    >
                      Sign up
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/sign-in"}
                      className="nav-link px-2 link-body-emphasis text-light"
                    >
                      Sign In
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/sign-up-biz"
                      className="nav-link px-2 link-body-emphasis text-light"
                    >
                      Sign Up Business
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="form-check form-switch mx-5 ">
        <label
          className="form-check-label "
          htmlFor="flexSwitchCheckDefault"
        ></label>
        {checked ? (
          <i className="bi bi-moon-stars"></i>
        ) : (
          <i className="bi bi-brightness-high-fill"></i>
        )}
        <input
          className="form-check-input "
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          onChange={toggle}
        />
      </div>

      <form className="col-2 col-lg-auto mb-3 mb-lg-6 me-lg-6" role="search">
        <input
          type="search"
          className="form-control"
          placeholder="Search..."
          aria-label="Search"
          value={search}
          onChange={handleInputChange}
          id="myInput"
        />
      </form>
    </header>
  );
};
export default Header;
