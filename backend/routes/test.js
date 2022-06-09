
export const test = (req, res, next) => {



    res.status(200).json({
        user: {name: "alex"},
        user: {name: "bob"},
        user: {name: "carl"},
        user: {name: "dave"},
        user: {name: "eric"},
        user: {name: "fred"},
        user: {name: "greg"},
    })
}