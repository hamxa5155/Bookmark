const AWS = require('aws-sdk');

const sourceEmail = 'no-reply@bookmarkdofficial.com';

//[TODO]: Must update email addresses
const getSignupParams = (email, code) => {
    return ({
        Source: sourceEmail,
        Destination: {
            ToAddresses: [email]
        },
        Message: {
            Subject: {
                Charset: 'UTF-8',
                Data: 'Signup Confirmation Email'
            },
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: `Code: ${code}`
                },
                Html: {
                    Charset: 'UTF-8',
                    Data: `<h1>Code: ${code}</h1>`
                }
            }
        },
        ReplyToAddresses: [sourceEmail]
    });
};

const getForgetPasswordParams = (email, tempPassword) => {
    return ({
        Source: sourceEmail,
        Destination: {
            ToAddresses: [email]
        },
        Message: {
            Subject: {
                Charset: 'UTF-8',
                Data: 'Forget Password Email'
            },
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: `Temporary Password: ${tempPassword}`
                },
                Html: {
                    Charset: 'UTF-8',
                    Data: `<h1>Temporary Password: ${tempPassword}</h1>`
                }
            }
        },
        ReplyToAddresses: [sourceEmail]
    });
}

// [TODO]: Account for error if email fails to send
module.exports = (email, actionType, payload) => {
    AWS.config.update({ region: 'us-east-1' });

    const ses = new AWS.SES({ apiVersion: '2010-12-01' });
    
    let params;
    switch(actionType) {
        case 'SIGNUP':
            params = getSignupParams(email, payload);
            break;

        case 'PASSWORD-FORGET':
            params = getForgetPasswordParams(email, payload);
            break;
    }

    ses.sendEmail(params, (err, data) => {
        // console.log(data);
        if (err) {
            console.log(err, err.stack);
        }
    });
}
