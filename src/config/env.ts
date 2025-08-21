const env = {
  apiUrl: import.meta.env.VITE_PUBLIC_API_URL as string,
  appName: import.meta.env.VITE_PUBLIC_APP_NAME ?? "DefaultApp",
};

export default env;
