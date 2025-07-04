const cartModel = require("../../models/cartModel")
const { responseReturn } = require('../../utils/response')
const { mongo: {ObjectId}} = require('mongoose')

class cartController{

    add_to_cart = async(req, res) => {
        const { userId, productId, quantity } = req.body
        try {
            const product = await cartModel.findOne({
                $and: [{
                    productId : {
                        $eq: productId
                    }
                },
                {
                    userId: {
                        $eq: userId
                    }
                }
            ]
            })

            if (product) {
                responseReturn(res,404,{error: 'Product Already Added to Cart'})
            } else {
                const product = await cartModel.create({
                    userId,
                    productId,
                    quantity
                })
                responseReturn(res,201,{message: 'Product Added to Cart Successfully', product})
            }

        } catch (error) {
            console.log(error.message)
        }
    }
    // End Method

    get_cart_products = async(req, res) => {
        const {userId } = req.params
        try {
            const cart_products = await cartModel.aggregate([{
                $match: {
                    userId: {
                        $eq: new ObjectId(userId)
                    }
                }
            },
        {
            $lookup : {
                from: 'products',
                localField: 'productId',
                foreignField: '_id',
                as: 'products'
            }
        }
        ])
        let buy_product_item = 0
        let calculatePrice = 0;
        let cart_product_count = 0;
        const outOfStockProduct = cart_products.filter(p => p.products[0].stock < p.quantity)
        for (let i = 0; i < outOfStockProduct.length; i++) {
            cart_product_count = cart_product_count + outOfStockProduct[i].quantity
        }
        const stockProduct = cart_products.filter(p => p.products[0].stock >= p.quantity)
        for (let i = 0; i < stockProduct.length; i++) {
            const { quantity } = stockProduct[i]
            cart_product_count = buy_product_item + quantity

            buy_product_item = buy_product_item + quantity
            const { price,discount } = stockProduct[i].products[0]
            if (discount !== 0) {
                calculatePrice = calculatePrice + quantity * (price - Math.floor((price * discount) / 100))
            } else {
                calculatePrice = calculatePrice + quantity * price
            }
            
        } // End for

            console.log(buy_product_item)
        } catch (error) {
            console.log(error.message)
        }
    }

}

module.exports = new cartController()