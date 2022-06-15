
export const test = (req, res, next) => {

    res.status(200).json([{
        user_1: { name: "alex" },
        user_2: { name: "bob" },
        user_3: { name: "carl" },
        user_4: { name: "dave" },
        user_5: { name: "eric" },
        user_6: { name: "fred" },
        user_7: { name: "greg" },
    }])
}