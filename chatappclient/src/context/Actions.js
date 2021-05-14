export const LoginStart = () => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (userCredencials) => ({
  type: "LOGIN_SUCCESS",
  payload: userCredencials,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const Logout = () => ({
  type: "LOGOUT",
});

export const joinRoom = (room) => ({
  type: "JOIN_ROOM",
  payload: room,
});
