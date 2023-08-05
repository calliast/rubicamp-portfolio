// response-format
const Response = require("../../traits/response-format");

// Auth-service
const { AuthService } = require("../../services");
const authService = new AuthService();

class AuthController {
  loginPage = (req, res) => {
    res.render("login", { error: req.flash(`error`) });
  };

  registerPage = (req, res) => {
    res.render("register", { error: req.flash(`error`) });
  };

  login = async (req, res) => {
    try {
      await authService.login(req);

      // res
      //   .status(status)
      //   .send(new Response({ status, description, message }, data));

      if (req.session.user.role === "Operator") {
        res.redirect("/sales");
      } else {
        res.redirect("/dashboard");
      }
    } catch (error) {
      console.log(
        `🚀 ~ file: AuthController.js:38 ~ AuthController ~ login= ~ error::\n`,
        error
      );

      res.redirect("/");
    }
  };

  register = async (req, res) => {
    try {
      await authService.register(req);
      res.redirect("/");
    } catch (error) {
      res.redirect("/register");
    }
  };
}

module.exports = AuthController;
