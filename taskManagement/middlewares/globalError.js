export const globalError = (err, req, res, next) => {
    console.error(`[ERRO] - ${err.status} - ${err.message}`)
    res.status(err.status || 500).json({
        error: true,
        message: err.message || 'Erro interno no servidor!'
    })
}