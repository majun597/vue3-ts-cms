//1.方式一：手动切换不同的环境（不推荐）
// const BASE_URL = 'http://coderwhy.org/dev'
// const BASE_NAME = 'coderwhy'

// const BASE_URL = 'http://coderwhy.org/prod'
// const BASE_NAME = 'kobe'

// const BASE_URL = 'http://coderwhy.org/test'
// const BASE_NAME = 'james'

// 2.方式二：根据process.env.NODE_ENV(代表三个环境)
// 开发环境：development 生产环境：production 测试环境：test
let BASE_URL = ''
const TIME_OUT = 10000
//进行判断
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://152.136.185.210:5000'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://coderwhy.org/prod'
} else {
  BASE_URL = 'http://coderwhy.org/test'
}

export {TIME_OUT, BASE_URL}
