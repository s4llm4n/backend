const cartModel = require("../../models/cartModel")

class cartController{

    add_to_cart = async(req, res) => {
        const { userId, productId, quantity } = req.body
        try {
            const product = await cartModel.findOne({
                $and: [{
                    productId
                }]
            })
        } catch (error) {
            
        }
    }
    // End Method
}

module.exports = new cartController()