const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeMessage = (email, name) => {
    const msg = {
        to: email,
        from: 'Task_app@somethin.com',
        subject: 'Welcome to Task Application',
        text: `Welcome ${name}, please enjoy our service.`
        //html: `<img src='https://cdn.pixabay.com/photo/2016/03/31/19/50/checklist-1295319__340.png'>`
    }

    sgMail.send(msg);
}

const sendDeleteMessage = (email, name) => {
    const msg = {
        to: email,
        from: 'Task_app@somethin.com',
        subject: 'Account successfully deleted.',
        text: `Hi ${name}, we are sorry to lose you. Please reply back on this email if you have any suggestions.`,
        //html: `<img src='https://cdn.pixabay.com/photo/2016/03/31/19/50/checklist-1295319__340.png'>`
    }

    sgMail.send(msg);
}

module.exports = {
    sendWelcomeMessage,
    sendDeleteMessage
}