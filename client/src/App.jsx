import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddProposal,
  Stats,
  AllProposals,
  Profile,
  Admin,
  EditProposal,
  DeleteProposal,
} from "../src/pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as addProposalAction } from "./pages/AddProposal";
import { loader as allProposalsLoader } from "./pages/AllProposals";
import { action as editProposalAction } from "./pages/EditProposal";
import { loader as editProposalLoader } from "./pages/EditProposal";
import { action as deleteProposalAction } from "./pages/DeleteProposal";
import { loader as adminLoader } from "./pages/Admin";
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
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "all-proposals",
            element: <AllProposals />,
            loader: allProposalsLoader(queryClient),
            errorElement: <ErrorElement />,
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
