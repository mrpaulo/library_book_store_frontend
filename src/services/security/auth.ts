export const  saveTokenStorage = (token: any) => {
  sessionStorage.setItem('@App:token', JSON.stringify(token));
}
export const   getTokenStorage = () => {
 return JSON.parse(sessionStorage.getItem('@App:token') as string);
 }

 export const   removeTokenStorage = () => {
 sessionStorage.removeItem('@App:token');
  }