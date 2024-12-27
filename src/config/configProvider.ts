interface Config {
  apiBaseUrl: string;
  environment: 'development' | 'production';
  enableDebug: boolean;
}

const config: Config = {
  apiBaseUrl: import.meta.env.VITE_APP_API_URL || 'http://localhost:5000',
  environment: import.meta.env.NODE_ENV as 'development' | 'production',
  enableDebug: import.meta.env.NODE_ENV === 'development',
};

export default config;
