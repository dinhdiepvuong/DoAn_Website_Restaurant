import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authSlice, { findOneAdminInAuth } from "../redux/slices/authSlice";
import { AppDispatch } from "../redux/store";

function Redux() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const getAuth = async () => {
      try {
        const adminId = localStorage.getItem("adminId") || "laodsa";

        const result = await dispatch(findOneAdminInAuth(adminId)).unwrap();

        const { admin } = result?.data;

        if (!admin) {
          dispatch(authSlice.actions.logout());
          navigate("/login");
        }
      } catch (error) {
        dispatch(authSlice.actions.logout());
        navigate("/login");
      }
    }

    getAuth();
  }, [dispatch]);

  return null;
}

export default Redux;
