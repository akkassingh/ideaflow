import { toast } from "react-toastify";
import { ProposalsContainer, ProposalSearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";

const allProposalQuery = (params) => {
  const { search, sort, page, proposalStatus, proposalDomain } = params;
  return {
    queryKey: [
      "proposal",
      search ?? "",
      proposalStatus ?? "",
      proposalDomain ?? "",
      sort ?? "newest",
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get("/proposal", { params });
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    await queryClient.ensureQueryData(allProposalQuery(params));
    return { searchValues: { ...params } };
  };
const AllProposalsContext = createContext();
export default function AllProposals() {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allProposalQuery(searchValues));

  return (
    <AllProposalsContext.Provider value={{ data, searchValues }}>
      <ProposalSearchContainer />
      <ProposalsContainer />
    </AllProposalsContext.Provider>
  );
}
export const useAllProposalsContext = () => useContext(AllProposalsContext);
