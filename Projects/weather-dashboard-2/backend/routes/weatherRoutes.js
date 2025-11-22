import express from "express";
import Weather from "../models/Weather.js";
import authMiddle from "../middleware/auth.js";
import { getWeatherInfo } from "../services/weatherService.js"


// here we are going to create 2 routes 
// 1 for getting the weather and saving the data into the database 
// 2nd to fetch all those places temperature, that you have been searching for. 

const router = express.Router();

router.post('/search', authMiddle, async ( req , res ) => {
    try {
        const { city } = req.body;

        if(!city) {
            return res.status(401).json({
                message : "City is removed"
            })
        }

        const findTemperature = await getWeatherInfo(city);

        if(!findTemperature) {
            return res.status(401).json({
                message : "The data for the place that you searched for, doesn't exists"
            })
        }

        const weather = await Weather.create({
            city : findTemperature.name,
            temperature : findTemperature.main.temp,
            description : findTemperature.weather[0].description,
            humidity : findTemperature.main.humidity,
            user : req.user.id
        });

        res.status(200).json({
            message : `The below is the information about ${city}`,
            city : weather.city,
            temperature : weather.temperature + " C",
            description : weather.description,
            humidity : weather.humidity,
            time : weather.createdAt
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "Error came while getting the Temperature"
        })
    }
})

router.get('/history', authMiddle, async( req , res ) => {
    try {
        const allData = await Weather.find({ user : req.user.id }).sort({ createdAt : -1 });

        res.status(200).json({
            message : "The following is your history of places that you searched for",
            allData
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "Error in getting the history of the places you searched for"
        })
    }
})