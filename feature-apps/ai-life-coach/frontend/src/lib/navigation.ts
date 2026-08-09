'use client';

import {
  useParams as useNextParams,
  usePathname,
  useRouter,
  useSearchParams as useNextSearchParams,
} from 'next/navigation';

type NavigateTarget = string | number;

export function useNavigate() {
  const router = useRouter();

  return (target: NavigateTarget) => {
    if (typeof target === 'number') {
      window.history.go(target);
      return;
    }

    router.push(target);
  };
}

export function useParams<T extends Record<string, string | undefined> = Record<string, string | undefined>>() {
  return useNextParams() as T;
}

export function useSearchParams() {
  return [useNextSearchParams()] as const;
}

export { usePathname };
