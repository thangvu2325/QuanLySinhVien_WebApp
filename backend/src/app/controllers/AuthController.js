const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { env } = require("process");
let refreshTokens = [];

class AuthController {
  register(req, res) {
    res.render("register");
  }
  login(req, res) {
    res.render("login");
  }
  handleLogin(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    User.findByUsername(username, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with username ${username}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with username " + username,
          });
        }
      } else {
        const passwordIsValid = bcrypt.compareSync(password, data.password);
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }

        const accessToken = jwt.sign(
          { id: data.id },
          env.AccessToken_SECRET_KEY,
          {
            expiresIn: "3600s",
          }
        );
        const refreshToken = jwt.sign(
          { id: data.id },
          env.RefreshToken_SECRET_KEY,
          {
            expiresIn: "30d",
          }
        );
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const _doc = {
          role: data.role,
          userId: data.id,
        };
        return res.status(200).json({ _doc, accessToken });
      }
    });
  }
  async signup(req, res) {
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const user = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, salt),
      role: req.body.role ? req.body.role : "user",
    });
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      else res.send(data);
    });
  }
  refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json("You're not authenticated");
    }

    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh Token is not valid");
    }

    jwt.verify(refreshToken, env.RefreshToken_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Refresh Token verification failed");
      }

      // Xoá refreshToken cũ khỏi danh sách
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      // Tạo mã thông báo mới
      const newAccessToken = jwt.sign(
        { id: user.id },
        env.AccessToken_SECRET_KEY,
        { expiresIn: "3600s" }
      );
      // const newRefreshToken = jwt.sign(
      //   { id: user.id },
      //   env.RefreshToken_SECRET_KEY,
      //   { expiresIn: "30d" }
      // );

      // // Thêm refreshToken mới vào danh sách
      // refreshTokens.push(newRefreshToken);

      // // Gửi refreshToken mới về trình duyệt
      // res.cookie("refreshToken", newRefreshToken, {
      //   httpOnly: true,
      //   secure: false,
      //   path: "/",
      //   sameSite: "strict",
      // });

      // Trả về accessToken mới
      return res.status(200).json({ accessToken: newAccessToken });
    });
  }

  //LOG OUT
  logOut(req, res) {
    const refreshToken = req.cookies.refreshToken;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully!" });
  }
}

module.exports = new AuthController();
