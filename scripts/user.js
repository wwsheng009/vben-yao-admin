function sessionTimeout() {
  return Process("scripts.return.Error", "", "403", "");
}

function tokenExpired() {
  return Process("scripts.return.Error", "Token Expired!", "401", "");
}
