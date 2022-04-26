import useSWR, {SWRConfiguration} from 'swr';

// @ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json());

const config: SWRConfiguration = {
    // fallbackData: "fallback",
    revalidateOnMount: true,
    loadingTimeout: 3000
}

export const useUser = () => {
    return useSWR<any>("/api/auth/@me", fetcher, config);
}

export const useMemes = () => {
    return useSWR<any>("/api/users/memes", fetcher, config);
}
