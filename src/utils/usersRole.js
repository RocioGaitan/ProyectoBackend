import config from "../config/config.js";

//rol de usuario depende de su email
function userRole(email) {
  if (email === config.adminNAME) {
    return {
      role: "admin",
    };
  }
  if (email === config.adminEMAIL) {
    return {
      role: "premium",
    };
  } else {
    return {
      role: "user",
    };
  }
}

export default userRole;