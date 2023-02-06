const bcrypt = require('bcryptjs');
exports.users = [
  {
    name: 'Ibrahim',
    email: 'ibra@ham.com',
    password: bcrypt.hashSync('ibra2571', 12),
    isAdmin: true,
  },
  {
    name: 'Zahara',
    email: 'zaha@ra.com',
    password: bcrypt.hashSync('ibra2571', 12),
  },
  {
    name: 'Rebbeca',
    email: 'rebb@eca.com',
    password: bcrypt.hashSync('ibra2571', 12),
  },
  {
    name: 'Faith',
    email: 'fai@hth.com',
    password: bcrypt.hashSync('ibra2571', 12),
  },
];
