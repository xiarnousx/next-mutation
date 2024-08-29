"use client";
import { useFormStatus } from "react-dom";
// useFormStatus:
// 1. Must be in a seperate componet
// 2. Must be included between <form> element
// 3. Must be a client component

function FormSubmit() {
  const status = useFormStatus();
  if (status.pending) {
    return <p>Creating post...</p>;
  }
  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
}

export default FormSubmit;
