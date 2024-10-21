import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("User created successfully, Please confirm your email");
    },
    onError: () => {
      toast.error("Error during creating the user");
    },
  });
  return { signup, isPending };
}
