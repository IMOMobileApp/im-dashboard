"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export function withAuth(WrappedComponent) {
  const Wrapper = (props) => {
    const router = useRouter();
    useEffect(() => {
      // Check if the user is not logged in
      const loginCredentials = JSON.parse(
        localStorage.getItem("loginResponse")
      );
      const userID = loginCredentials?.Status;
      if (!userID) {
        // Redirect to the login page
        router.push("/login");
      }
    }, [router]);
    return <WrappedComponent {...props} />;
  };
  return Wrapper;
}
