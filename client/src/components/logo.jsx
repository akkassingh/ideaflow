import logo from "../assets/images/new-logo.jpeg";
export default function Logo() {
  return (
    <img
      src={logo}
      alt="Ideaflow"
      className="logo"
      style={{ width: 180, paddingTop: 30 }}
    />
  );
}
