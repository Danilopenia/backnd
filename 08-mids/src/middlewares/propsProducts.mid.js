function propsProducts(req, res, next) {
    

    const { name, place }= req.body
    if (!name || !place) {
       return res.json({
        statusCode: 400,
        message:  `${req.method} ${req.url} name and place are required`,
       }) ;
    }else{
        return next()
    }
} 

export default propsProducts