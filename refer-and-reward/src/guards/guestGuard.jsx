import { useCallback, useEffect, useState } from "react";
import { getToken } from "@/service/authUtils";
import { useRouter } from "next/router";

export const GuestGuard = ({ children }) => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const check = useCallback(async () => {
    if (getToken()) {
      router.replace("/dashboard");
    } else {
      setChecked(true);
    }
  }, [router]);

  // Only check on mount, this allows us to redirect the user manually when auth state changes
  useEffect(
    () => {
      check();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};
