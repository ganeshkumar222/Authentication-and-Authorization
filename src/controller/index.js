const homepage = (req,res)=>{
    try {
        res.status(200).send(
            `<h1>welcome to authentication and authorization<h1/>`
        )
    } catch (error) {
        res.status(500).send({
            message:"internal server error"
            
        })
    }
}

export default {
    homepage
}