'use strict';

const userFormObj = new UserForm();
userFormObj.loginFormCallback = (data) => {
  ApiConnector.login(data, (response) => {
    if (response.success) {
      location.reload();
    } else {
      userFormObj.setLoginErrorMessage(response.data);
    }
  });
}
userFormObj.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    if (response.success) {
      location.reload();
    } else {
      userFormObj.setRegisterErrorMessage(response.data);
    }
  });
}
