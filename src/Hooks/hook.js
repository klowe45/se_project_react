import { useState } from "react";

export function useForm(inputValues) {
  const [value, setValues] = useState(inputValues);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...setValues, [name]: value });
  };
  return { value, setValues, handleChange };
}
