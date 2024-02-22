"use client";

import React, { useEffect } from "react";
import Feature from "@/views/homepage/Feature";
import Hero from "@/views/homepage/Hero";
import FAQ from "@/views/homepage/FAQ";
import LastCTA from "@/views/homepage/LastCTA";
import Testimonials from "@/views/homepage/Testimonials";
import Benefits from "@/views/homepage/Benefits";
import { useSession } from "next-auth/react";
import Spinner from "@/components/icons/Spinner";
import Dashboard from "@/views/dashboard/Dashboard";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="h-[calc(100vh-78px)] flex flex-col overflow-hidden gap-4 justify-center items-center">
        <Spinner />
        <h1>Preparing to launch...</h1>
      </div>
    );
  }

  return session && session.user ? (
    <Dashboard session={session} />
  ) : (
    <>
      <div className="bg-slate-900">
        <div className="flex flex-col max-w-screen-lg mx-auto px-2 sm:px-4 lg:px-6 py-16">
          <Hero />
        </div>
      </div>
      <div className="flex flex-col max-w-screen-lg mx-auto px-2 sm:px-4 lg:px-6 gap-44 mt-24">
        <Feature />
        <Benefits />
        <Testimonials />
        <FAQ />
        <LastCTA />
      </div>
    </>
  );
}
