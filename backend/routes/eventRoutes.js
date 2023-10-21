import express from 'express';
import { isAuthenticated,isAdmin } from '../middleware/authMiddleware.js';
import {
    createEvent,
    getAllEvents,
    getAllEventsByShop,
    deleteShopEventById,
    getEvents,
} from "../controllers/eventController.js"

const router = express.Router();

// create event
router.post(
    "/create-event",createEvent);

// get all events
router.get("/get-all-events",getAllEvents);

// get all events of a shop
router.get(
    "/get-all-events/:id",getAllEventsByShop);


// delete event of a shop
router.delete(
    "/delete-shop-event/:id",deleteShopEventById);

// all events --- for admin
router.get(
    "/admin-all-events",
    isAuthenticated,
    isAdmin("Admin"),getEvents);


export default router;