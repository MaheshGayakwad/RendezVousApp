const getChatDetails = (loggedUser, users) => {
  if (users && users.length >= 1) {
    return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
  } else {
    return "user"; // or handle this case accordingly
  }
};

export default getChatDetails;
