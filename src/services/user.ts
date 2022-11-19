const getUserName = (userName: string) => {
  userName = userName.charAt(0).toUpperCase() + userName.slice(1)

  return userName
}

export {
  getUserName
}