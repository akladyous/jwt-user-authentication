
export const signout = (req, res, next) => {
    // res.cookie('token', '', {maxAge: 1})
    
    res.cookie('app.sid', '', {maxAge: 1})
    // req.session.cookie.maxAge = 1000
    // req.session.cookie.expires = new Date(Date.now()) + 1000
    req.session.destroy()
    res.status(200).json({message: 'Logout successful completed'})
}