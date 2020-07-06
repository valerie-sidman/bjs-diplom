'use strict';

const userFormObj = new UserForm();
userFormObj.loginFormCallback = (data) => {
  ApiConnector.login(data, (response) => {
    if (response.success) {
      location.reload();
    } else {
      userFormObj.setLoginErrorMessage('Ошибка авторизации!');
    }
  });
}
userFormObj.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    if (response.success) {
      location.reload();
    } else {
      userFormObj.setRegisterErrorMessage('Ошибка регистрации!');
    }
  });
}
