import { toast } from "react-toastify";
import { UsersContainer, UserSearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";

const allUserQuery = (params) => {
  const { search, sort, page, role, VerifiedForAdminAccess } = params;
  return {
    queryKey: [
      "users",
      search ?? "",
      sort ?? "newest",
      page ?? 1,
      role ?? "",
      VerifiedForAdminAccess ?? "",
    ],
    queryFn: async () => {
      const { data } = await customFetch.get("/users", { params });
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
    await queryClient.ensureQueryData(allUserQuery(params));
    return { searchValues: { ...params } };
  };
const AllUsersContext = createContext();
export default function AllUsers() {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allUserQuery(searchValues));

  return (
    <AllUsersContext.Provider value={{ data, searchValues }}>
      <UserSearchContainer />
      <UsersContainer />
    </AllUsersContext.Provider>
  );
}
export const useAllUsersContext = () => useContext(AllUsersContext);
