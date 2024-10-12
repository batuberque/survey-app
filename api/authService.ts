import axiosInstance from '~/api/axios';

export interface LoginParams {
  username: string;
  password: string;
}

export const loginService = async ({ username, password }: LoginParams): Promise<string> => {
  try {
    console.log('Login request initiated with:', { username, password });

    const response = await axiosInstance.post('/auth/login', {
      username,
      password,
    });

    console.log('Response received:', response);

    const data: { token: string } = response.data;

    console.log('Parsed token data:', data);

    if (!data.token) {
      console.error('Token not received from server');
      throw new Error('Token not received from server');
    }

    console.log('API Token:', data.token);
    return data.token;
  } catch (error: any) {
    console.error('API error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
