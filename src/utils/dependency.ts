import { join } from 'path';

export const getDependencyPath = (entry: string, cwd?: string) => {
  return entry.startsWith('@/') || entry.startsWith('.')
    ? entry
    : join(cwd || process.cwd(), 'node_modules', entry);
};
