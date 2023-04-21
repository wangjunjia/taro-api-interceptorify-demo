import { useCallback, useState } from 'react'
import taro, { showModal, interceptorify, navigateTo, request } from '@tarojs/taro'
import './index.less'

const modalInterceptorify = interceptorify<taro.showModal.Option, taro.showModal.SuccessCallbackResult>(showModal)
modalInterceptorify.addInterceptor(async function (chain) {
  const res = await chain.proceed({
    ...chain.requestParams,
    title: 'interceptor1'
  })
  return res
})
modalInterceptorify.addInterceptor(async function (chain) {
  const res = await chain.proceed({
    ...chain.requestParams,
    content: 'interceptor2'
  })
  return res
})

const navToInterceptorify = interceptorify<taro.navigateTo.Option, TaroGeneral.CallbackResult >(navigateTo)
navToInterceptorify.addInterceptor(async function (chain) {
  if (chain.requestParams.url == 'detail') {
    return await chain.proceed({
      ...chain.requestParams,
      url: `/pages/detail/index?interceptor=interceptor1`,
    })
  }
  return {
    errMsg: 'Invalid Page',
  }
})

interface IRequestOption {
  url: string
}
const fetchDataInterceptorify = interceptorify<IRequestOption, any>(request)
fetchDataInterceptorify.addInterceptor(async function (chain) {
  taro.showLoading({
    title: 'Loading...'
  })
  const res = await chain.proceed(chain.requestParams)
  taro.hideLoading()
  return res
})
fetchDataInterceptorify.addInterceptor(async function (chain) {
  const params = chain.requestParams
  const res = await chain.proceed({
    url: 'http://httpbin.org' + params.url,
  })
  return res.data
})

export default function Index() {

  const handleShowModal = useCallback(() => {
    return modalInterceptorify.request({})
  }, [])

  const handleNavto404 = useCallback(() => {
    return navToInterceptorify.request({
      url: '404'
    }).then(({ errMsg }) => {
      if (errMsg != 'ok') {
        taro.showToast({
          title: errMsg,
          icon: 'error',
        })
      }
    })
  }, [])

  const handleNavtoDetail = useCallback(() => {
    return navToInterceptorify.request({
      url: 'detail'
    }).then(({ errMsg }) => {
      if (errMsg != 'ok') {
        // taro.showToast({
        //   title: errMsg,
        //   icon: 'error',
        // })
      }
    })
  }, [])

  const [ ip, updateIp ] = useState('--')
  const handleFetchData = useCallback(() => {
    return fetchDataInterceptorify.request({
      url: '/ip'
    }).then((res) => {
      console.log(res)
      updateIp(res.origin)
    })
  }, [])

  return (
    <View className='index'>
      <Button onClick={handleShowModal}>show modal</Button>
      <Button onClick={handleNavto404}>to 404 page</Button>
      <Button onClick={handleNavtoDetail}>to detail page</Button>
      <Button onClick={handleFetchData}>get my ip</Button>
      <View className='my-ip'>my ip is : { ip }</View>
    </View>
  )
}
