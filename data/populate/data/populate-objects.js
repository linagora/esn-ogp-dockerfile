'use strict';

module.exports = {

  ADMIN: {
    firstname: 'admin',
    lastname: 'admin',
    password: process.env.ESN_ADMIN_PASSWORD,
    accounts: [{
      type: 'email',
      emails: [process.env.ESN_ADMIN_EMAIL]
    }]
  },

  DOMAIN: {
    name: process.env.ESN_DOMAIN,
    company_name: process.env.ESN_COMPANY
  },
};
