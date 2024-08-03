import UserTile from "./UserTile";
import Wrapper from "../assets/wrappers/UsersContainer";
import { useAllUsersContext } from "../pages/AllUsers";
import UsersPageBtnContainer from "./UsersPageBtnContainer";

export default function UsersContainer() {
  const { data } = useAllUsersContext();
  const { items, totalItems, numOfPages } = data;
  if (items.length === 0) {
    return (
      <Wrapper>
        <h2>No Users To Display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalItems} User{totalItems.length > 1 && "s"}
      </h5>
      <div className="users">
        {items.map((item) => {
          return <UserTile key={item._id} {...item} />;
        })}
      </div>
      {numOfPages > 1 && <UsersPageBtnContainer />}
    </Wrapper>
  );
}
