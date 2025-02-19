export type TLoginUser = {
  id: string;
  password: string;
};

export type TChangePassowrd = {
  oldPassword: string;
  newPassword: string;
};

export type TJwtPayload = {
  id: string;
  role: string;
};

export type TResetPassword = {
  id: string;
  newPassword: string;
  token: string;
};
