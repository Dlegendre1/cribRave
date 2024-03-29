// 'use strict';

// const { Image, Sequelize } = require('../models/image');
// const bcrypt = require('bcryptjs');


// let options = {};
// options.tableName = 'Images';

// if (process.env.NODE_ENV === 'production') {
//     options.schema = process.env.SCHEMA;
// }

// module.exports = {
//     up: async (queryInterface, Sequelize) => {
//         options.tableName = "Images";
//         return queryInterface.bulkInsert(options, [
//             {
//                 userId: 1,
//                 postId: 1,
//                 url: "demo@url.com",
//             },
//             {
//                 userId: 2,
//                 postId: 2,
//                 url: "demo@url.com",
//             },
//             {
//                 userId: 3,
//                 postId: 3,
//                 url: "demo@url.com",
//             },
//         ], {});
//     },

//     down: async (queryInterface, Sequelize) => {
//         options.tableName = "Images";
//         const Op = Sequelize.Op;
//         return queryInterface.bulkDelete(options, {
//             userId: { [Op.in]: [1, 2, 3] }
//         });
//     }
// };
