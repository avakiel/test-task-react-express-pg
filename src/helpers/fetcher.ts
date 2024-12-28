export const fetcher = async (endpoint: string, options?: RequestInit) => {
  const res = await fetch(`https://express-be-topics.vercel.app${endpoint}`, options);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};
