import React from "react";
import SettingsInfo from "./_components/settings-info";
import { db } from "@/lib/db";
import { auth } from "@/auth";

const page = async () => {
  return (
    <section>
      <SettingsInfo />
    </section>
  );
};

export default page;
