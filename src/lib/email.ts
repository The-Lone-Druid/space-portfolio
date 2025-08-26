/**
 * Email configuration and utilities for authentication
 * Production-ready with Resend integration
 */

import { Resend } from 'resend'
import { EmailConfig, EmailData } from '../types'

const emailConfig: EmailConfig = {
  from: process.env.EMAIL_FROM || 'noreply@space-portfolio.com',
  service: (process.env.EMAIL_SERVICE as EmailConfig['service']) || 'console',
}

// Initialize Resend client only when API key is available
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error(
      'RESEND_API_KEY environment variable is required when using Resend service'
    )
  }
  return new Resend(apiKey)
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  email: string,
  resetToken: string
): Promise<void> {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`

  const emailData: EmailData = {
    to: email,
    subject: 'Reset Your Space Portfolio Password',
    html: generatePasswordResetHTML(resetUrl),
    text: generatePasswordResetText(resetUrl),
  }

  await sendEmail(emailData)
}

/**
 * Send email verification email
 */
export async function sendVerificationEmail(
  email: string,
  verificationToken: string
): Promise<void> {
  const verifyUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${verificationToken}`

  const emailData: EmailData = {
    to: email,
    subject: 'Verify Your Space Portfolio Email',
    html: generateVerificationHTML(verifyUrl),
    text: generateVerificationText(verifyUrl),
  }

  await sendEmail(emailData)
}

/**
 * Generic email sending function
 */
async function sendEmail(emailData: EmailData): Promise<void> {
  switch (emailConfig.service) {
    case 'console':
      // For development - log to console
      console.warn('📧 Email would be sent:')
      console.warn(`To: ${emailData.to}`)
      console.warn(`Subject: ${emailData.subject}`)
      console.warn(`Content: ${emailData.text}`)
      console.warn('---')
      break

    case 'resend':
      try {
        const resend = getResendClient()
        const { data, error } = await resend.emails.send({
          from: emailConfig.from,
          to: emailData.to,
          subject: emailData.subject,
          html: emailData.html,
          text: emailData.text,
        })

        if (error) {
          console.error('Resend error:', error)
          throw new Error(`Failed to send email: ${error.message}`)
        }

        console.warn(`📧 Email sent successfully via Resend. ID: ${data?.id}`)
      } catch (error) {
        console.error('Failed to send email via Resend:', error)
        throw error
      }
      break

    default:
      throw new Error(`Unsupported email service: ${emailConfig.service}`)
  }
}

/**
 * Generate HTML content for password reset email
 */
function generatePasswordResetHTML(resetUrl: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Space Portfolio Password</title>
      <style>
        /* Space Theme Email Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #ffffff;
          background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%);
          padding: 20px;
          min-height: 100vh;
        }

        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background: rgba(26, 26, 46, 0.9);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }

        .header {
          background: linear-gradient(135deg, #16213e, #533483);
          padding: 40px 30px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .header::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(114, 9, 183, 0.1) 0%, transparent 70%);
          animation: cosmic-glow 4s ease-in-out infinite;
        }

        @keyframes cosmic-glow {
          0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.5; }
          50% { transform: rotate(180deg) scale(1.1); opacity: 0.8; }
        }

        .header-content {
          position: relative;
          z-index: 2;
        }

        .rocket-icon {
          font-size: 48px;
          margin-bottom: 16px;
          display: block;
          filter: drop-shadow(0 0 20px #7209b7);
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .header h1 {
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
          text-shadow: 0 0 20px rgba(114, 9, 183, 0.8);
        }

        .header h2 {
          font-size: 20px;
          font-weight: 400;
          color: #ffd700;
          margin: 0;
        }

        .content {
          padding: 40px 30px;
          background: rgba(22, 33, 62, 0.4);
          backdrop-filter: blur(15px);
        }

        .content p {
          margin-bottom: 20px;
          color: #e5e7eb;
          font-size: 16px;
        }

        .cta-section {
          text-align: center;
          margin: 40px 0;
        }

        .reset-button {
          display: inline-block;
          background: linear-gradient(135deg, #7209b7, #533483);
          color: #ffffff;
          padding: 16px 32px;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(114, 9, 183, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .reset-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(114, 9, 183, 0.5);
          background: linear-gradient(135deg, #8a2be2, #6a4c93);
        }

        .url-box {
          background: rgba(10, 10, 15, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 16px;
          margin: 20px 0;
          word-break: break-all;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          color: #ffd700;
          text-align: center;
        }

        .warning-box {
          background: rgba(255, 193, 7, 0.1);
          border: 1px solid rgba(255, 193, 7, 0.3);
          border-radius: 12px;
          padding: 20px;
          margin: 30px 0;
          position: relative;
        }

        .warning-icon {
          font-size: 24px;
          margin-bottom: 12px;
          display: block;
        }

        .warning-box h3 {
          color: #ffd700;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .warning-box ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .warning-box li {
          color: #f3f4f6;
          margin-bottom: 8px;
          padding-left: 20px;
          position: relative;
        }

        .warning-box li::before {
          content: '✦';
          position: absolute;
          left: 0;
          color: #ffd700;
          font-weight: bold;
        }

        .footer {
          background: rgba(10, 10, 15, 0.9);
          padding: 30px;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer p {
          margin: 0;
          color: #9ca3af;
          font-size: 14px;
          line-height: 1.5;
        }

        .stars {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image:
            radial-gradient(2px 2px at 20px 30px, #ffffff, transparent),
            radial-gradient(2px 2px at 40px 70px, #ffffff, transparent),
            radial-gradient(1px 1px at 90px 40px, #ffffff, transparent),
            radial-gradient(1px 1px at 130px 80px, #ffffff, transparent),
            radial-gradient(2px 2px at 160px 30px, #ffffff, transparent);
          background-repeat: repeat;
          background-size: 200px 100px;
          animation: twinkle 3s linear infinite;
          opacity: 0.6;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        /* Responsive Design */
        @media (max-width: 640px) {
          body {
            padding: 10px;
          }

          .email-container {
            border-radius: 12px;
          }

          .header {
            padding: 30px 20px;
          }

          .header h1 {
            font-size: 24px;
          }

          .header h2 {
            font-size: 16px;
          }

          .content {
            padding: 30px 20px;
          }

          .reset-button {
            padding: 14px 24px;
            font-size: 15px;
          }

          .footer {
            padding: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <div class="stars"></div>
          <div class="header-content">
            <span class="rocket-icon">🚀</span>
            <h1>Space Portfolio</h1>
            <h2>Password Reset Request</h2>
          </div>
        </div>

        <div class="content">
          <p>Hello, Space Explorer!</p>

          <p>We received a request to reset your password for your Space Portfolio account. If you initiated this request, click the button below to create a new password and continue your journey through the digital cosmos.</p>

          <div class="cta-section">
            <a href="${resetUrl}" class="reset-button">Reset My Password</a>
          </div>

          <p>Alternatively, you can copy and paste this link into your browser:</p>
          <div class="url-box">${resetUrl}</div>

          <div class="warning-box">
            <h3>⚠️ Important Security Information</h3>
            <ul>
              <li>This reset link will expire in 1 hour for your security</li>
              <li>If you didn't request this password reset, please ignore this email</li>
              <li>Your current password remains unchanged until you create a new one</li>
              <li>Never share this link with anyone else</li>
            </ul>
          </div>

          <p>If you're having trouble with the button above, copy and paste the URL into your web browser.</p>

          <p>Safe travels through the digital cosmos,<br><strong>The Space Portfolio Team</strong></p>
        </div>

        <div class="footer">
          <p>This email was sent from Space Portfolio. If you have any questions or need assistance, please contact our mission control.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

/**
 * Generate plain text content for password reset email
 */
function generatePasswordResetText(resetUrl: string): string {
  return `
🚀 SPACE PORTFOLIO - PASSWORD RESET REQUEST

Hello, Space Explorer!

We received a request to reset your password for your Space Portfolio account.

To reset your password and continue your journey through the digital cosmos, visit this link:
${resetUrl}

⚠️ IMPORTANT SECURITY INFORMATION:
✦ This link will expire in 1 hour for your security
✦ If you didn't request this reset, please ignore this email
✦ Your current password remains unchanged until you create a new one
✦ Never share this link with anyone else

If you're having trouble with the link above, copy and paste the entire URL into your web browser.

Safe travels through the digital cosmos,
The Space Portfolio Team

---
This email was sent from Space Portfolio. If you have any questions or need assistance, please contact our mission control.
  `.trim()
}

/**
 * Generate HTML content for email verification
 */
function generateVerificationHTML(verifyUrl: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Space Portfolio - Verify Your Email</title>
      <style>
        /* Space Theme Email Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #ffffff;
          background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%);
          padding: 20px;
          min-height: 100vh;
        }

        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background: rgba(26, 26, 46, 0.9);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }

        .header {
          background: linear-gradient(135deg, #16213e, #10b981);
          padding: 40px 30px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .header::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
          animation: cosmic-glow 4s ease-in-out infinite;
        }

        @keyframes cosmic-glow {
          0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.5; }
          50% { transform: rotate(180deg) scale(1.1); opacity: 0.8; }
        }

        .header-content {
          position: relative;
          z-index: 2;
        }

        .welcome-icon {
          font-size: 48px;
          margin-bottom: 16px;
          display: block;
          filter: drop-shadow(0 0 20px #10b981);
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .header h1 {
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
          text-shadow: 0 0 20px rgba(16, 185, 129, 0.8);
        }

        .header h2 {
          font-size: 20px;
          font-weight: 400;
          color: #ffd700;
          margin: 0;
        }

        .content {
          padding: 40px 30px;
          background: rgba(22, 33, 62, 0.4);
          backdrop-filter: blur(15px);
        }

        .content p {
          margin-bottom: 20px;
          color: #e5e7eb;
          font-size: 16px;
        }

        .welcome-message {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 12px;
          padding: 20px;
          margin: 30px 0;
          text-align: center;
        }

        .welcome-message h3 {
          color: #10b981;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .cta-section {
          text-align: center;
          margin: 40px 0;
        }

        .verify-button {
          display: inline-block;
          background: linear-gradient(135deg, #10b981, #059669);
          color: #ffffff;
          padding: 16px 32px;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .verify-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(16, 185, 129, 0.5);
          background: linear-gradient(135deg, #059669, #047857);
        }

        .url-box {
          background: rgba(10, 10, 15, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 16px;
          margin: 20px 0;
          word-break: break-all;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          color: #ffd700;
          text-align: center;
        }

        .footer {
          background: rgba(10, 10, 15, 0.9);
          padding: 30px;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer p {
          margin: 0;
          color: #9ca3af;
          font-size: 14px;
          line-height: 1.5;
        }

        .stars {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image:
            radial-gradient(2px 2px at 20px 30px, #ffffff, transparent),
            radial-gradient(2px 2px at 40px 70px, #ffffff, transparent),
            radial-gradient(1px 1px at 90px 40px, #ffffff, transparent),
            radial-gradient(1px 1px at 130px 80px, #ffffff, transparent),
            radial-gradient(2px 2px at 160px 30px, #ffffff, transparent);
          background-repeat: repeat;
          background-size: 200px 100px;
          animation: twinkle 3s linear infinite;
          opacity: 0.6;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        /* Responsive Design */
        @media (max-width: 640px) {
          body {
            padding: 10px;
          }

          .email-container {
            border-radius: 12px;
          }

          .header {
            padding: 30px 20px;
          }

          .header h1 {
            font-size: 24px;
          }

          .header h2 {
            font-size: 16px;
          }

          .content {
            padding: 30px 20px;
          }

          .verify-button {
            padding: 14px 24px;
            font-size: 15px;
          }

          .footer {
            padding: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <div class="stars"></div>
          <div class="header-content">
            <span class="welcome-icon">🌟</span>
            <h1>Space Portfolio</h1>
            <h2>Welcome Aboard!</h2>
          </div>
        </div>

        <div class="content">
          <div class="welcome-message">
            <h3>🚀 Welcome to the Digital Cosmos!</h3>
            <p>Your journey through space begins here. Let's get your account verified and ready for exploration.</p>
          </div>

          <p>Hello, Future Space Explorer!</p>

          <p>Welcome to Space Portfolio! We're excited to have you join our cosmic community. To complete your account setup and begin your journey through the digital universe, please verify your email address.</p>

          <div class="cta-section">
            <a href="${verifyUrl}" class="verify-button">Verify My Email</a>
          </div>

          <p>Alternatively, you can copy and paste this link into your browser:</p>
          <div class="url-box">${verifyUrl}</div>

          <p>Once verified, you'll have full access to explore the cosmos and showcase your stellar projects.</p>

          <p>If you didn't create an account with Space Portfolio, please ignore this email and your address will not be added to our system.</p>

          <p>Welcome to the cosmos,<br><strong>The Space Portfolio Team</strong></p>
        </div>

        <div class="footer">
          <p>This email was sent from Space Portfolio. If you have any questions or need assistance with your space mission, please contact our mission control.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

/**
 * Generate plain text content for email verification
 */
function generateVerificationText(verifyUrl: string): string {
  return `
🚀 SPACE PORTFOLIO - WELCOME ABOARD!

🌟 Welcome to the Digital Cosmos!

Hello, Future Space Explorer!

Welcome to Space Portfolio! We're excited to have you join our cosmic community. Your journey through the digital universe begins here.

To complete your account setup and begin exploring the cosmos, please verify your email address by visiting this link:
${verifyUrl}

Once verified, you'll have full access to:
✦ Showcase your stellar projects
✦ Explore the digital cosmos
✦ Connect with fellow space explorers
✦ Access all mission control features

If you didn't create an account with Space Portfolio, please ignore this email and your address will not be added to our system.

Welcome to the cosmos,
The Space Portfolio Team

---
This email was sent from Space Portfolio. If you have any questions or need assistance with your space mission, please contact our mission control.
  `.trim()
}
