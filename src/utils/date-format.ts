//进行日期时间的格式化

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'


//服务器返回utc字符串类型的转化
export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
  ) {
    return dayjs.utc(utcString).format(format)
}

//服务器返回时间戳类型时间的转化
// export function formatTimeStamp(
//   timestamp: number,
//   format: string = DATE_TIME_FORMAT
//   ) {
//     return dayjs.utc(utcString).format(format)
// }
