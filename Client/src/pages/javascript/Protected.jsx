import React from "react";
import { Outlet } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export default function Protected() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

  useEffect(() => {
    const validate = async () => {
      try {
        if (!cookies.jwt) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:5000/auth/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();

        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");

          enqueueSnackbar("Something went wrong, Please login again.", {
            variant: "error",
          });
        }
      } catch (error) {
        enqueueSnackbar("Something went wrong, Please login again.", {
          variant: "error",
        });
        removeCookie("jwt");
        navigate("/login");
      }
    };

    validate();
  }, [cookies]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
