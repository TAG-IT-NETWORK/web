export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Send email via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'TAG IT Contact Form <noreply@tagit.network>',
        to: 'info@tagit.network',
        reply_to: email,
        subject: `[Contact Form] ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00D4FF; border-bottom: 2px solid #00D4FF; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #666; width: 100px;"><strong>Name:</strong></td>
                <td style="padding: 10px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>Email:</strong></td>
                <td style="padding: 10px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>Subject:</strong></td>
                <td style="padding: 10px 0;">${subject}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
              <strong style="color: #666;">Message:</strong>
              <p style="margin-top: 10px; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 30px; color: #999; font-size: 12px;">
              This message was sent from the TAG IT Network website contact form.
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend API error:', errorData);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true, message: 'Email sent successfully' });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
