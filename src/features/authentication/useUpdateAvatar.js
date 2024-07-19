import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateAvatar as updateAvatarApi } from "../../services/apiAuth";

export function useUpdateAvatar() {
  const queryClient = useQueryClient();

  const { mutate: updateAvatar, isPending: isUpdating } = useMutation({
    mutationFn: updateAvatarApi,
    onSuccess: () => {
      toast.success("Avatar updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {isUpdating, updateAvatar}
}
