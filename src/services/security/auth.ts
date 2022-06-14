const TOKEN_NAME = '@LBS_App:token';

export const saveTokenStorage = (token: any) => {
  sessionStorage.setItem(TOKEN_NAME, JSON.stringify(token));
}
export const getTokenStorage = () => {
  return JSON.parse(sessionStorage.getItem(TOKEN_NAME) as string);
}

export const getTokenValueStorage = () => {
  let token = getTokenStorage() || ''
  return token.access_token;
}

export const removeTokenStorage = () => {
  sessionStorage.removeItem(TOKEN_NAME);  
}