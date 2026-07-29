import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import routeAuth from './routes/auth'
import routeProduct from './routes/product'
import routeUser from './routes/user'
import routeOrder from './routes/order'
import middlewareError from './middlewares/error'
import './configs/passport'

// 防止被攻擊， mongoose 會自動過濾掉不合法的查詢條件，進行消毒
mongoose.set('sanitizeFilter', true)

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('資料庫連線成功')
  })
  .catch((error) => {
    console.error(error)
    console.error('資料庫連線失敗')
  })

const app = express()

// 使用 Helmet，進行簡易防護
app.use(helmet())

app.use(
  cors({
    // origin 請求來源網域
    // callback(錯誤, 是否允許)
    origin: (origin, callback) => {
      if (
        origin &&
        [
          'http://localhost:3000',
          'http://127.0.0.1:3000',
          'https://zhengfang121.github.io',
        ].includes(origin)
      ) {
        callback(null, true)
      } else {
        callback(new Error('CORS'), false)
      }
    },
    // 允許跨網域請求攜帶 cookie
    credentials: true,
  }),
)

app.use(express.json())
app.use(cookieParser())

app.use('/auth', routeAuth)
app.use('/product', routeProduct)
app.use('/user', routeUser)
app.use('/order', routeOrder)

app.use(middlewareError)

app.listen(process.env.PORT || 4000, () => {
  console.log('伺服器啟動')
})
