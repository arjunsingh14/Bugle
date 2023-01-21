import React, { PropsWithChildren, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
interface storeState {
  email: string | null;
  token: string | null;
  register: boolean;
  topHeadlines: object[];
  filteredHeadlines: object[];
  sources: string[];
  country: string;
}
const ProtectedRoute = ({children} : any) => {
  const { email } = useSelector<RootState, storeState>((state) => state.reducer);
  if (!email) {
    console.log("removing");
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
