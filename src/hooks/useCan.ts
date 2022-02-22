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

  /**
   * Permissões
   */
  if (user.permissions && permissions?.length) {
    const hasAllPermissions = permissions.every((permission) => {
      return user.permissions.includes(permission);
    });
    if (!hasAllPermissions) {
      return false;
    }
  }

  /**
   * Papéis
   */
  if (user.roles && roles?.length) {
    const hasAllRoles = roles.some((role) => {
      return user.roles.includes(role);
    });

    if (!hasAllRoles) {
      return false;
    }
  }

  return true;
}
