const model = require("../models");
const bcrypt = require("bcryptjs");

class userService {
  static async updateCode({ code, email }) {
    return await model.users.update(
      { code: code },
      { where: { email: email.trim() } }
    );
  }
  static async checkPassword({ id, currentPassword }) {
    const user = await model.users.findOne({ where: { id: id } });
    if (user) {
      return await bcrypt.compareSync(currentPassword, user.password);
    } else {
      return false;
    }
  }
  static async checkEmail({ email }) {
    const checkEmail = await model.users.findOne({ where: { email: email } });
    if (checkEmail) {
      return true;
    }
    return false;
  }
  static async checkCode({ email, code }) {
    const checkCode = await model.users.findOne({
      where: { email: email, code: code },
    });
    console.log(checkCode);
    if (checkCode) {
      return true;
    }
    return false;
  }
  static async resetPassword({ email, newPassword, confirmPassword }) {
    if (newPassword !== confirmPassword) {
      return false;
    }

    const hashedPassword = await bcrypt.hashSync(newPassword, 10);
    console.log(newPassword);
    console.log(hashedPassword);
    console.log(email);
    const resetStatus = await model.users.update(
      { password: hashedPassword },
      { where: { email: email } }
    );
    if (resetStatus[0]) {
      return true;
    }
    return false;
  }
}
module.exports = userService;