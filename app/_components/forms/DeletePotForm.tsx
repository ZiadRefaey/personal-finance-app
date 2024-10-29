import React from "react";
import Button from "../Button";

export default function DeletePotForm() {
  return (
    <form className="w-full flex items-center justify-center flex-col">
      <Button
        className="bg-red text-white hover:opacity-70 mb-3 w-full hover:bg-red"
        type="submit"
      >
        Yes, Confirm Deletion
      </Button>
      <button
        type="reset"
        className="py-2 text-secondary hover:text-primary duration-150 transition-all w-full"
      >
        No, Go Back
      </button>
    </form>
  );
}
