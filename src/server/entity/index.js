const sequelize = require('sequelize');
const sequelizeInstance = require('./instance');

const user = sequelizeInstance.define('user', {
    account: { type: sequelize.STRING(200), allowNull: false }, // 아이디
    password: { type: sequelize.STRING(255), allowNull: false }, // 패스워드
    prePassword: { type: sequelize.STRING(255), allowNull: false }, // 직전 패스워드
    name: { type: sequelize.STRING(30), allowNull: false }, // 이름
    mail: { type: sequelize.STRING(150), allowNull: false },
    phone: { type: sequelize.STRING(15), allowNull: true }, // 핸드폰번호
    status: { type: sequelize.BOOLEAN, allowNull: true, defaultValue : 1 }, // 계정 정지 여부
    token: { type: sequelize.STRING(300), allowNull: true },
    loginFailCount: { type: sequelize.SMALLINT.UNSIGNED, defaultValue : 0 },
    passwordUpdatedAt: { type: sequelize.DATE, allowNull: true },
    loginedAt: { type: sequelize.DATE, allowNull: true },
    createdAt: { type: sequelize.DATE, allowNull: false },
    updatedAt: { type: sequelize.DATE, allowNull: false }
},
{
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});

const bot = sequelizeInstance.define('bot', {
    user_id: { type: sequelize.INTEGER(11), allowNull : true }, // false
    name: { type : sequelize.STRING(255), allowNull : true }, // false
    description: { type : sequelize.STRING(300), allowNull : true }, // false
    createdAt: { type: sequelize.DATE, allowNull: false },
    updatedAt: { type: sequelize.DATE, allowNull: false }
},
{
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});


module.exports = {
    user,
    bot
};
