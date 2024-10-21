import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateName as updateNameApi } from "../../services/apiAuth";

export function useUpdateName() {
  const queryClient = useQueryClient();

  const { mutate: updateName, isPending: isUpdating } = useMutation({
    mutationFn: updateNameApi,
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {isUpdating, updateName}
}
