import { useCan } from "../hooks/useCan";

interface CanProps {
  children: React.ReactNode;
  permissions?: string[];
  roles?: string[];
}

export function Can({ children, permissions, roles }: CanProps) {
  const canSeeComponent = useCan({ permissions, roles });

  if (!canSeeComponent) return null;

  return <>{children}</>;
}
