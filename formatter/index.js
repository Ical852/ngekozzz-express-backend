module.exports = {
    success: (res, message, dataBody) => {
        return res.status(200).json({
            meta: {
                message: message,
                code: 200,
                status: "success"
            },
            data: dataBody
        })
    },
    failed: (res, message, error) => {
        return res.status(500).json({
            message: message,
            error: error
        })
    }
}