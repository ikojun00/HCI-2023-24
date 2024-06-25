import { Backend_URL } from "@/lib/constants";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

interface Session {
  user: { id: number; email: string; firstName: string };
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

interface Props {
  session: Session;
}

export default function AboutMeTab({ session }: Props) {
  return <div className="flex flex-col ">About Me</div>;
}
