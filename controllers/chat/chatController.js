const sellerModel = require('../../models/sellerModel')
const customerModel = require('../../models/customerModel')

class chatController{

    add_customer_friend = async (req,res) => {
        const {sellerId, userId} = req.body 

        try {
           if (sellerId !== '') {
            const seller = await sellerModel.findById(sellerId)
            const user = await customerModel.findById(userId)
            console.log(user)
           } 

        } catch (error) {
            console.log(error)
        }
    }
    // End Method

}

module.exports = new chatController()