//@ts-nocheck
const nodemailer = require('nodemailer');

class Email {
  constructor() {
    this.from = process.env.EMAIL_FROM;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // ==========================
  // CONTACT FORM MAIL
  // ==========================
  async sendContactMessage({ firstName, lastName, email, phone, subject, message }) {
    await this.newTransport().sendMail({
      from: this.from,
      to: process.env.EMAIL_FROM,
      subject: `New Contact Message - ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>

        <div style="padding:10px;background:#f5f5f5;border-radius:8px;">
          ${message}
        </div>
      `,
    });
  }

  // ==========================
  // PASSWORD RESET MAIL
  // ==========================
  async sendPasswordReset(email, resetUrl) {
    await this.newTransport().sendMail({
      from: this.from,
      to: email,
      subject: 'Reset Your Password',
      html: `
        <h2>Password Reset Request</h2>

        <p>You requested a password reset.</p>

        <p>
          <a href="${resetUrl}">
            Click here to reset your password
          </a>
        </p>

        <p>This link will expire in 10 minutes.</p>

        <p>If you did not request this, please ignore this email.</p>
      `,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Send Temporary Password Email
  |--------------------------------------------------------------------------
  | Send generated temporary password
  | User can login using this password
  | User should change password after login
  |--------------------------------------------------------------------------
  */

  async sendTemporaryPassword(email, tempPassword) {
    await this.newTransport().sendMail({
      from: this.from,
      to: email,
      subject: 'Temporary Password - E Learn Platform',
      html: `
      <h2>Forgot Password Request</h2>

      <p>Your temporary password is:</p>

      <h1>${tempPassword}</h1>

      <p>
        Please login using this password and
        immediately change your password from
        Profile Settings.
      </p>

      <p>
        Do not share this password with anyone.
      </p>
    `,
    });
  }
}

module.exports = new Email();
