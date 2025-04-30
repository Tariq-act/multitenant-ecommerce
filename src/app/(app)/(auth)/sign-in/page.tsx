import { redirect } from "next/navigation";

import { caller } from "@/trpc/server";

import { SignInViews } from "@/modules/auth/ui/views/sign-in-view";

const Page = async () => {
  const session = await caller.auth.session();

  if (session.user) {
    redirect("/");
  }

  return <SignInViews />;
};

export default Page;
