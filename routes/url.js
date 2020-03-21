'use strict';

const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const { getEnvVar } = require('../env');

const Url = require('../models/Url');

router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = getEnvVar('BASE_URL');

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json({ error: 'Invalid base url' });
  }

  const urlCode = shortid.generate();
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        return res.json({ url });
      } else {
        const shortUrl = baseUrl + '/' + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode
        });
        await url.save();
        return res.json({ url });
      }
    } catch (err) {
      return res.status(500).json({ error: 'Server error' });
    }
  } else {
    return res.status(401).json({ error: 'Invalid long url' });
  }
});

module.exports = router;
