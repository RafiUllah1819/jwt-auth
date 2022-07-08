import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const VerifyEmail = () => {
  const [emailVerified, setEmailVerified] = useState("");
  const params = useParams();

  const verifyToken = async () => {
    try {
      toast.loading();
      const response = await axios.post(
        "http://localhost:5000/api/auth/verifyemail",
        { token: params.token }
      );
      if (response.data.success) {
        setEmailVerified("true");
      } else {
        setEmailVerified("false");
      }
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      setEmailVerified("false");
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div>
      {emailVerified == "" && (<h1>Please wait we are verifying your email</h1>)}

      {emailVerified == "true" && (<h1>Your email verified successfully</h1>)}

      {emailVerified == "false" && (<h1>Invalid or Expired Token</h1>)}
    </div>
  );
};
