import { useMutation } from "@tanstack/react-query";
import { createOwner } from "@/lib/api/ownerService";

export function useRegisterOwner(options = {}){
    return useMutation({
        mutationFn: ({ownerData, photos }) => createOwner(ownerData, photos),
        ...options,
    });
}