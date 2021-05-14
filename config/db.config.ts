/**
 * 数据库配置
 */

const productConfig = {
  mysql: {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "123456",
    "database": "nest_db",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true,
    "autoLoadEntities": true
  }
}

const localConfig = {
  mysql: {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "123456",
    "database": "nest_db",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true,
    "autoLoadEntities": true
  }
}

// 本地运行是没有process.env.NODE_ENV的，借此来区分开发和生产环境
const config = process.env.NODE_ENV ? productConfig : localConfig

export default config
