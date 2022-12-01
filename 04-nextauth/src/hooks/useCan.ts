import { validateUserPermissions } from "../utils/validateUserPermissions";
import { useAuth } from "./useAuth";

interface useCanProps {
  permissions?: string[];
  roles?: string[];
}

export function useCan({ permissions, roles }: useCanProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return false;
  }

  return validateUserPermissions({ user, permissions, roles });
}
