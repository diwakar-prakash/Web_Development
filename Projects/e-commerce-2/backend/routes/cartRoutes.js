import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import authMiddle from '../middleware/auth.js';

const router = express.Router();

// here we are going to create 3 routes 
// 1st one for posting the item in the cart 
// 2nd is for the getting all the elements from the cart
// 3rd is for the removing the item from the cart


router.post('/add', authMiddle, async ( req , res ) => {
    try {
        const { productId, quantity } = req.body;

        const findIfProductExists = await Product.findById(productId);

        if(!findIfProductExists) {
            return res.status(401).json({
                message : "Invalid Product, no such product exits"
            })
        }

        let cart = await Cart.findOne({ user : req.user.id });

        if(!cart) {
            cart = await Cart.create({
                user : req.user.id,
                items : [
                    {
                        product : productId,
                        quantity : quantity
                    }
                ]
            })
            return res.status(201).json({
                message : "Item has been added to the cart",
                cart : cart
            })
        }

        const productIsInTheCart = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if(productIsInTheCart) {
            productIsInTheCart.quantity += quantity
        }
        else {
            cart.items.push({
                product : productId,
                quantity  : quantity
            })
        }

        await cart.save();

        res.status(201).json(cart);
    }
    catch ( err ) {
        res.status(401).json({
            message : "There has been some error in adding the element in the cart"
        })
    }
})


// now we are going to see the items in the cart

router.get('/', authMiddle, async ( req, res ) => {
    try {
        const cart = await Cart.findOne({ user : req.user.id }).populate("items.product");
        res.status(200).json(cart || {});
    }
    catch ( err ) {
        res.status(404).json({
            message : "Some error to fetch the cart items"
        })
    }
})



// we are now going to delete the cart items 

router.delete('/remove/:id', authMiddle, async ( req, res) => {
    try {
        let cart = await Cart.findOne({ user : req.user.id });
        cart.items = cart.items.filter(
            (item) => item.product.toString() !== req.params.id
        )
        await cart.save();

        res.status(200).json({
            message : "Your item has been deleted",
            cart : cart 
        })
    }
    catch ( err ) {
        res.status(401).json({
            message : "Some error came while deleting the item in the cart"
        })
    }
})

export default router;

