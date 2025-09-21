const express = require('express');
const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// donate (donor only) -> mock: just save donation and update campaign. No real payment here.
router.post('/', auth, requireRole('donor'), async (req, res) => {
  try {
    const { campaignId, amount } = req.body;
    if (!campaignId || !amount) return res.status(400).json({ message: 'Missing fields' });

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    if (campaign.status !== 'active') return res.status(400).json({ message: 'Campaign not active' });

    const donation = new Donation({
      donorId: req.user._id,
      campaignId,
      amount
    });
    await donation.save();

    campaign.raisedAmount = (campaign.raisedAmount || 0) + Number(amount);
    await campaign.save();

    res.json({ donation, campaign });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// donor's donation history
router.get('/me', auth, requireRole('donor'), async (req, res) => {
  try {
    const donations = await Donation.find({ donorId: req.user._id }).populate('campaignId', 'title');
    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// donations for a campaign (NGO only, owner)
router.get('/campaign/:id', auth, requireRole('ngo'), async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    if (!campaign.createdBy.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

    const donations = await Donation.find({ campaignId: campaign._id }).populate('donorId', 'name email');
    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
