/**
 * Email configuration and utilities for authentication
 * Note: This is a basic implementation. In production, use services like:
 * - Resend (recommended)
 * - SendGrid
 * - AWS SES
 * - Nodemailer with SMTP
 */

interface EmailConfig {
  from: string
  service: 'console' | 'resend' | 'sendgrid' // Add more as needed
}

const emailConfig: EmailConfig = {
  from: process.env.EMAIL_FROM || 'noreply@space-portfolio.com',
  service: (process.env.EMAIL_SERVICE as EmailConfig['service']) || 'console',
}

interface EmailData {
  to: string
  subject: string
  html: string
  text?: string
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
      // TODO: Implement Resend integration
      throw new Error('Resend integration not implemented yet')

    case 'sendgrid':
      // TODO: Implement SendGrid integration
      throw new Error('SendGrid integration not implemented yet')

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
    <html>
    <head>
      <meta charset="utf-8">
      <title>Reset Your Password</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
        .button { display: inline-block; background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
        .warning { background: #fef3cd; border: 1px solid #faebcc; color: #8a6d3b; padding: 15px; border-radius: 4px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 Space Portfolio</h1>
          <h2>Password Reset Request</h2>
        </div>
        <div class="content">
          <p>Hello!</p>
          <p>We received a request to reset your password for your Space Portfolio account. If you made this request, click the button below to reset your password:</p>

          <div style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset My Password</a>
          </div>

          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; background: #f8f9fa; padding: 10px; border-radius: 4px; font-family: monospace;">
            ${resetUrl}
          </p>

          <div class="warning">
            <strong>⚠️ Important:</strong>
            <ul>
              <li>This link will expire in 1 hour</li>
              <li>If you didn't request this reset, please ignore this email</li>
              <li>Your password will remain unchanged until you create a new one</li>
            </ul>
          </div>

          <p>If you're having trouble with the button above, copy and paste the URL into your web browser.</p>

          <p>Best regards,<br>The Space Portfolio Team</p>
        </div>
        <div class="footer">
          <p>This email was sent from Space Portfolio. If you have any questions, please contact support.</p>
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
Space Portfolio - Password Reset Request

Hello!

We received a request to reset your password for your Space Portfolio account.

To reset your password, visit this link:
${resetUrl}

Important:
- This link will expire in 1 hour
- If you didn't request this reset, please ignore this email
- Your password will remain unchanged until you create a new one

Best regards,
The Space Portfolio Team
  `.trim()
}

/**
 * Generate HTML content for email verification
 */
function generateVerificationHTML(verifyUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Verify Your Email</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
        .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 Space Portfolio</h1>
          <h2>Email Verification</h2>
        </div>
        <div class="content">
          <p>Welcome to Space Portfolio!</p>
          <p>Please verify your email address by clicking the button below:</p>

          <div style="text-align: center;">
            <a href="${verifyUrl}" class="button">Verify My Email</a>
          </div>

          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; background: #f8f9fa; padding: 10px; border-radius: 4px; font-family: monospace;">
            ${verifyUrl}
          </p>

          <p>If you didn't create an account with Space Portfolio, please ignore this email.</p>

          <p>Best regards,<br>The Space Portfolio Team</p>
        </div>
        <div class="footer">
          <p>This email was sent from Space Portfolio. If you have any questions, please contact support.</p>
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
Space Portfolio - Email Verification

Welcome to Space Portfolio!

Please verify your email address by visiting this link:
${verifyUrl}

If you didn't create an account with Space Portfolio, please ignore this email.

Best regards,
The Space Portfolio Team
  `.trim()
}
