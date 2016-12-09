'use strict';

module.exports = function() {

  var noreply = process.env.MAIL_NO_REPLY || 'noreply@open-paas.org';

  return {
    mail: {
      feedback: 'feedback@open-paas.org',
      noreply: noreply
    },
    transport: {
      config : {
        host : 'mail.linagora.com',
        ignoreTLS: true
      }
    }
  };
};
