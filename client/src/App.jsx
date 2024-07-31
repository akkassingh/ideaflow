import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  ForgetPassword,
  ResetPassword,
  DashboardLayout,
  Error,
  AddProposal,
  Stats,
  AllProposals,
  AllUsers,
  Profile,
  Admin,
  EditProposal,
  EditUser,
  DeleteProposal,
  DeleteUser,
  Support
} from "../src/pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as ForgetPasswordAction } from "./pages/ForgetPassword.jsx";
import { action as resetPasswordAction } from "./pages/ResetPassword";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as addProposalAction } from "./pages/AddProposal";
import { loader as allProposalsLoader } from "./pages/AllProposals";
import { loader as allUsersLoader } from "./pages/AllUsers";
import { action as editUserAction } from "./pages/EditUser";
import { loader as editUserLoader } from "./pages/EditUser";
import { action as deleteUserAction } from "./pages/DeleteUser";
import { action as editProposalAction } from "./pages/EditProposal";
import { loader as editProposalLoader } from "./pages/EditProposal";
import { action as deleteProposalAction } from "./pages/DeleteProposal";
// import { loader as adminLoader } from "./pages/Admin";
import { action as profileAction } from "./pages/Profile";
import { loader as statsLoader } from "./pages/Stats";
import ErrorElement from "./components/ErrorElement";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};
checkDefaultTheme();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction(queryClient),
      },
      {
        path: "forgetpassword",
        element: <ForgetPassword />,
        action: ForgetPasswordAction(queryClient),
      },
      {
        path: "resetpassword/:resetToken",
        element: <ResetPassword />,
        action: resetPasswordAction(queryClient),
      },
      {
        path: "DashBoard",
        element: <DashboardLayout queryClient={queryClient} />,

        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddProposal />,
            action: addProposalAction(queryClient),
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction(queryClient),
          },
          {
            path: "admin",
            element: <AllUsers />,
            loader: allUsersLoader(queryClient),
          },
          {
            path: "all-proposals",
            element: <AllProposals />,
            loader: allProposalsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "all-users",
            element: <AllUsers />,
            loader: allUsersLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "edit-user/:id",
            element: <EditUser />,
            action: editUserAction(queryClient),
            loader: editUserLoader(queryClient),
          },
          {
            path: "delete-user/:id",
            element: <DeleteUser />,
            action: deleteUserAction(queryClient),
          },
          {
            path: "edit-proposal/:id",
            element: <EditProposal />,
            action: editProposalAction(queryClient),
            loader: editProposalLoader(queryClient),
          },
          {
            path: "delete-proposal/:id",
            element: <DeleteProposal />,
            action: deleteProposalAction(queryClient),
          },
        ],
      },
      {
        path: "support",
        element: <Support />,
      }
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
