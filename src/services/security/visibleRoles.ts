import { ROLE_CLIENT } from "../api/constants";

function checkRoleClient(visibleToRoles: string[]) {
  return visibleToRoles.some(visibleToRole => visibleToRole === ROLE_CLIENT);
}

export const checkRoles = (visibleToRoles: string[], validToken: any) => {
  let visible = false;
  if (validToken) {
    if (validToken.authorities && validToken.authorities.length > 0) {
      visible = visibleToRoles.some(visibleToRole => validToken.authorities.includes(visibleToRole));
    } else {
      visible = checkRoleClient(visibleToRoles)
    }
  } else {
    visible = checkRoleClient(visibleToRoles)
  }

  return visible;
}