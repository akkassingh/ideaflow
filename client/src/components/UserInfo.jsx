import Wrapper from "../assets/wrappers/UserInfo";
export default function UserInfo({ icon, text }) {
  return (
    <Wrapper>
      <span className="user-icon">{icon}</span>
      <span className="user-text">{text}</span>
    </Wrapper>
  );
}
