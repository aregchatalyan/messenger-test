import { API_URL } from '../config';

export const fetcher = async (path: string, init: RequestInit = {}) => {
  const res = await fetch(`${ API_URL }/${ path }`, { ...init } );

  return res.json();
}
