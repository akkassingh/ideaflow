import Wrapper from "../assets/wrappers/ProposalInfo";
export default function ProposalInfo({ icon, text }) {
  return (
    <Wrapper>
      <span className="proposal-icon">{icon}</span>
      <span className="proposal-text">{text}</span>
    </Wrapper>
  );
}
