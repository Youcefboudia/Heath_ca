const pool = require("./connection");

async function Login(req, res) {
    const { email, password } = req.body;

    if (email === undefined || password === undefined) {
        res.render('Login', { error: true });
    } else {
        try {
            const result = await pool.query(
                'SELECT * FROM users WHERE email = $1 AND password = $2',
                [email, password]
            );

            if (result.rows.length > 0) {
                const user = result.rows[0];
                if (user.is_admin) {
                res.cookie('isAdmin', user.is_admin, { httpOnly: true, maxAge: 900000 });
                res.cookie('userId', user.id, { httpOnly: true, maxAge: 900000 });
                res.redirect('/home');

                } else {
                res.cookie('isUser', user.is_admin, { httpOnly: true, maxAge: 900000 });
                res.cookie('userId', user.id, { httpOnly: true, maxAge: 900000 });
                res.redirect('/home');
                }
            } else {
                res.render('Login', { error: true });
            }
        } catch (err) {
            console.log(err);
            res.render('Login', { error: true });
        }
    }
}

module.exports = Login;
