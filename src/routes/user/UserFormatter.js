const FormateUserObj = (userObj) => {
    const obj = {};
    obj.id = userObj.id;
    obj.username = userObj.username;
    obj.email = userObj.email;
    obj.password = userObj.password;

    return obj;
};

module.exports = {
    FormateUserObj
};