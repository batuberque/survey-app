import axiosInstance from './axios';

export interface RegisterParams {
  username: string;
  password: string;
  email: string;
  telephone: string;
}

export const registerService = async ({ username, password, email, telephone }: RegisterParams) => {
  try {
    console.log('Register request initiated with:', { username, password, email, telephone });
    const response = await axiosInstance.post('/users', {
      username,
      password,
      email,
      telephone,
    });
    console.log('Response received:', response);
    return response.data;
  } catch (error: any) {
    console.error('API error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};
