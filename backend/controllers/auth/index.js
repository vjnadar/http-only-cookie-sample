const jwt = require("jsonwebtoken");

exports.setHttpOnlyCookie = async (req, res, next) => {
    /*This controller function sets the HTTP only cookie into the body of the response. 
  The cookie will remain in the HTTP header until it expires. Once set, you don't have to set it again*/
    if (req.body.email && req.body.password) {
        const email = req.body.email;
        const password = req.body.password;
        const token = jwt.sign(
            {
                userName: email,
                userId: `xxxxx-yyyyy-${password}-000-zzzzz`
            },
            "supersecretsauce",
            { expiresIn: "1h" }
        );
        /*If you are going to deploy your backend application, you must set the attributes 'sameSite' and 'secure'.
    The 'secure' attribute will only work if you use 'https'. The attribute 'sameSite' should be set to none, 
    if your backend is a separate service. If you are running your application on your 'development' server, 
    do not set the attributes, 'samesite' and 'secure.'
    */
        const httpOnlyCookieSpecs =
            process.env.NODE_ENV !== "DEV"
                ? {
                      httpOnly: true,
                      sameSite: "None",
                      maxAge: 3600000,
                      secure: true
                  }
                : {
                      httpOnly: true,
                      maxAge: 3600000
                  };
        res.status(201)
            .cookie("token", token, httpOnlyCookieSpecs)
            .json({
                token: token,
                message: "The HttpOnly cookie token was set.!",
                userId: `xxxxx-yyyyy-${password}-000-zzzzz`
            });
    } else {
        res.json({ message: "No username || password" });
    }
};

exports.sendHttpOnlyCookie = async (req, res, next) => {
    //This line will console.log the token inside the HTTP only cookie. Check the console of the server.
    console.log("Received HTTP Only Cookie-Token:");
    console.log(req.cookies.token);
    // res.clearCookie("token");
    res.status(200).json({ message: "Token received." });
};
exports.clearHttpOnlyCookie = async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({ message: "The HTTP only cookie was cleared!" });
};
