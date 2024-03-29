const { convert } = require('html-to-text');
const sgMail = require('@sendgrid/mail');
const Session = require('../models/sessionModel');
const Event = require('../models/eventModel');
const { Interval, DateTime } = require('luxon');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = class Email {
  constructor(user, url) {
    this.to = user ? user.email : '';
    this.firstName = user ? user.firstName : '';
    this.lastName = user ? user.lastName : '';
    this.url = url;
    this.from = `Serenity Ignited <${process.env.EMAIL_FROM}>`;
  }

  async sendWelcome() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      templateId: 'd-d925d3d9ee3d482183053a7fb7400b48',
      dynamicTemplateData: {
        firstName: this.firstName,
      },
    };

    sgMail.send(mailOptions);
  }
  async sendPasswordReset() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      templateId: 'd-a27bc9262f2041478d43d9bcdbb233a4',
      dynamicTemplateData: {
        url: this.url,
      },
    };
    sgMail.send(mailOptions);
  }

  async sendAppointmentConfirm(appointment) {
    const session = await Session.findById(appointment.session);
    const mailOptions = {
      from: this.from,
      to: this.to,
      templateId: 'd-c652205e87704c359fbc78d102dcfab6',
      dynamicTemplateData: {
        modality: session.modality,
        name: session.name,
        connection: appointment.connection,
        dateTimeString: `${Interval.fromISO(appointment.time).toLocaleString({
          weekday: 'short',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}`,
        paymentStatus:
          appointment.paid === true ? 'Paid In Full' : 'Due At Appointment',
        price: appointment.price,
      },
    };
    sgMail.send(mailOptions);
    this.notifyAdminSession(session, appointment);
  }

  async notifyAdminSession(session, appointment) {
    const mailOptions = {
      from: 'do-not-reply@serenityignited.com',
      to: `${process.env.EMAIL_TO_ADMIN}`,
      templateId: 'd-cc0177c831ad48b7819addd0ce996c12',
      dynamicTemplateData: {
        fullName: `${this.firstName} ${this.lastName}`,
        email: process.env.EMAIL_TO_ADMIN,
        modality: session.modality,
        name: session.name,
        connection: appointment.connection,
        dateTimeString: `${Interval.fromISO(appointment.time).toLocaleString({
          weekday: 'short',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}`,
      },
    };
    sgMail.send(mailOptions);
  }

  async sendEventConfirm(eventId, purchase) {
    const event = await Event.findById(eventId);
    const mailOptions = {
      from: this.from,
      to: this.to,
      templateId: 'd-34f85643cf254cd6b1828b133227ec0f',
      dynamicTemplateData: {
        event: event.name,
        dateTimeString: `${Interval.fromISO(event.time).toLocaleString({
          weekday: 'short',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}`,
        quantity: purchase.quantity,
        purchaseTotal: purchase.total,
      },
    };
    sgMail.send(mailOptions);
    this.notifyAdminEvent(event, purchase.quantity);
  }

  async notifyAdminEvent(event, quantity) {
    const mailOptions = {
      from: 'do-not-reply@serenityignited.com',
      to: `${process.env.EMAIL_TO_ADMIN}`,
      templateId: 'd-35c1805b96c54136b188c9e2acd90a75',
      dynamicTemplateData: {
        eventName: event.name,
        dateTimeString: `${Interval.fromISO(event.time).toLocaleString({
          weekday: 'short',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}`,
        fullName: `${this.firstName} ${this.lastName}`,
        quantity,
      },
    };
    sgMail.send(mailOptions);
  }

  async notifyAdminContactSubmission(name, email, body) {
    console.log(email);
    const mailOptions = {
      from: 'do-not-reply@serenityignited.com',
      to: `${process.env.EMAIL_TO_ADMIN}`,
      templateId: 'd-bd8edffeee9943bf829846f3cdefe813',
      dynamicTemplateData: {
        name,
        email,
        body,
      },
    };
    sgMail.send(mailOptions);
  }
};
