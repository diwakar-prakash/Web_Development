import express from 'express';
import Product from '../models/Product.js';
import upload from '../middleware/upload.js';
import authMiddle from '../middleware/auth.js';
import admin from '../middleware/admin.js';


const router = express.Router();

// now we are going to create some of the routes here 
// 1. admin post route
// 2. get all products for users
// 3. users can get the product by identity
// 4. admin can update the product
// 5. admin can delete the product


// the first one for the admin posting the about the product. Do you hear me, I bet you did. 

router.post ('/post', authMiddle, admin, upload.single('image'), async( req, res ) => {
    try {
        const { title, description, price, category, stock } = req.body;

        const product = await Product.create({
            title,
            description,
            price,
            category,
            stock,
            image : req.file ? req.file.path : null,
            createdBy : req.user.id
        });

        res.status(201).json({ 
            message : "Product created",
            product
        })
    } 
    catch( err ) {
        res.status(404).json({
            message : "Unable to post the product. Some errors occured"
        })
    }
})


// here we are going to get all the products via the filters that we are going to use. 

router.get("/", async ( req, res ) => {
    try {
        let query = {};

        if(req.query.search) {
            query.$or = [
                { title : new RegExp(req.query.search, "i")},
                { description : new RegExp(req.query.search, "i") }
            ];
        }

        if(req.query.category) {
            query.category = req.query.category;
        }

        const products = await Product.find(query);
        res.status(200).json({products});
    }
    catch ( err ) {
        res.status(500).json({
            message : err.message
        })
    }
})


// get the product by the id

router.get('/:id', async ( req, res ) => {
    try {
        const item = await Product.findById(req.params.id).populate("createdBy", "username email");
        if(!item) {
            return res.status(404).json({
                message : "Products not found..."
            })
        }
        res.status(200).json(item);
    }
    catch ( err ) {
        res.status(404).json({
            message : "Product is not found brother."
        })
    }
})



// yahan par the admin can update the product

router.put('/:id', authMiddle, admin, async ( req, res ) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { 
                new : true,
                runValidators : true
            }
        );

        res.status(200).json({
            message : "The Product has been updated...", 
            updateProduct
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "Some error came in updating the product"
        })
    }
})


// here the admin can delete the product 

router.delete('/:id', authMiddle, admin, async ( req, res ) => {
    try {
        const deteleProduct = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message : "Your product has been removed from the website. Product deleted successfully",
        })
    }
    catch ( err ) {
        res.status(401).json({
            message : "Some error came while deleting the product.."
        })
    }
})

export default router;

