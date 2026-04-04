import express from 'express'
import ContactSubmission from '../models/ContactSubmission.js'

const router = express.Router()

router.post('/contact', async (req, res) => {
  try {
    const { name, email, company, service, message } = req.body || {}
    if (!name || !email || !message) {
      return res.status(400).json({ success: false })
    }

    const formattedMessage = String(message).trim()
    await ContactSubmission.create({ name, email, company, service, message: formattedMessage })

    return res.json({ success: true, message: 'Form submitted successfully' })
  } catch (e) {
    return res.status(500).json({ success: false })
  }
})

export default router
