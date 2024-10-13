import React from "react";
import Button from "../_components/Button";
import { SignInWithGoogle } from "../_lib/actions";

export default function page() {
  return (
    <div>
      <form action={SignInWithGoogle}>
        <Button>Sign in with google</Button>
      </form>
    </div>
  );
}
