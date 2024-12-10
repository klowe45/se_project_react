import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer__content">
      <div>
        <p className="footer__developer-text">Developed By kenneth Lowe</p>
      </div>
      <div>
        <p className="footer__year-text">{currentYear}</p>
      </div>
    </div>
  );
}

export default Footer;
