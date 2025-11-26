import { resolve } from '$app/paths';

export const resolvePath = (path: string): string => (resolve as (path: string) => string)(path);

