var _ = require("lodash");

exports.register = function (data) {
  const user = data;
  var errors = {};
  var regEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  // Check isEmpty
  if (_.isEmpty(user.username)) errors.username = "username is empty";
  if (_.isEmpty(user.password)) errors.password = "password is empty";
  if (_.isEmpty(user.firstName)) errors.firstName = "firstname is empty";
  if (_.isEmpty(user.lastName)) errors.lastName = "lastname is empty";

  // Check regEx
  if (!user.email.match(regEx)) errors.email = "invalid email";

  return errors;
};
