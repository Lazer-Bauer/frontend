const Footer = () => {
  return (
    <footer className="py-3 my-4 text-primary opacity-75">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item pe-5">
          <i className="bi bi-info-circle ps-3 fs-5"></i>
          <a href="#" className="nav-link px-2 text-primary p-0">
            About
          </a>
        </li>

        <li className="nav-item pe-5">
          <i className="bi bi-heart ps-3 fs-5"></i>
          <a href="#" className="nav-link px-2 text-primary p-0">
            Favorite
          </a>
        </li>
        <li className="nav-item pe-5">
          <i className="bi bi-person-rolodex ps-4 fs-5"></i>
          <a href="#" className="nav-link px-2 text-primary p-0">
            My-Cards
          </a>
        </li>
      </ul>
      <div className="copyRight text-center pe-5">
        Eliezer Bauer
        <span className="mx-2">&copy;</span>
        <span>{new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};
export default Footer;
