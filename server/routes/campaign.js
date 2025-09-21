const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const { verifyToken } = require("../middlewares/auth");
const Campaigns = require("../models/Campaign");

// cloud config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// random id
const getRandomId = () =>
    Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

// ---------------- CREATE CAMPAIGN ----------------
router.post("/campaign/", verifyToken, async (req, res) => {
    try {
        const { title, description, category, goalAmount } = req.body;
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: "Image is required", isError: true });
        }

        const imageFile = req.files.image;
        const result = await cloudinary.uploader.upload(imageFile.tempFilePath);

        const cid = getRandomId();
        const campaign = new Campaigns({
            cid,
            title,
            description,
            category,
            goalAmount,
            image: result.secure_url,
            createdBy: req.userId, // now it will store logged-in user's _id
            status: "active",
        });

        await campaign.save();
        res
            .status(200)
            .json({ message: "Campaign created successfully.", campaign, isError: false });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Something went wrong while creating the campaign.", isError: true });
    }
});

// ---------------- SEARCH CAMPAIGNS ----------------
router.get("/search_campaign", async (req, res) => {
    try {
        const { search, category } = req.query;
        const filter = {};

        if (category) filter.category = category;
        if (search) {
            filter.$or = [
                { title: new RegExp(search, "i") },
                { description: new RegExp(search, "i") },
            ];
        }

        const campaigns = await Campaigns.find(filter).populate("createdBy", "name email");
        res.json(campaigns);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// ---------------- GET SINGLE CAMPAIGN ----------------
router.get("/get_campaign/:id", async (req, res) => {
    try {
        const campaign = await Campaigns.findById(req.params.id).populate(
            "createdBy",
            "name email"
        );
        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found", isError: true });
        }
        res.status(200).json({ message: "Campaign exist", campaign, isError: false });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Something went wrong while fetching the campaign", isError: true });
    }
});

// ---------------- DELETE CAMPAIGN ----------------
router.delete("/delete_campaign/:id", async (req, res) => {
    try {
        const delCampaign = await Campaigns.findByIdAndDelete(req.params.id);
        if (!delCampaign) {
            return res.status(404).json({ message: "Campaign not found", isError: true });
        }
        res
            .status(200)
            .json({ message: "Campaign deleted successfully", campaign: delCampaign, isError: false });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Something went wrong while deleting Campaign", isError: true });
    }
});

module.exports = router;
