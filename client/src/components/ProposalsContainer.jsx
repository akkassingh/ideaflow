import ProposalTile from "./ProposalTile";
import Wrapper from "../assets/wrappers/ProposalsContainer";
import { useAllProposalsContext } from "../pages/AllProposals";
import PageBtnContainer from "./PageBtnContainer";
export default function ProposalsContainer() {
  const { data } = useAllProposalsContext();
  const { items, totalItems, numOfPages } = data;
  if (items.length === 0) {
    return (
      <Wrapper>
        <h2>No Proposals To Display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalItems} Proposal{totalItems.length > 1 && "s"}
      </h5>
      <div className="proposals">
        {items.map((item) => {
          return <ProposalTile key={item._id} {...item} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
}
