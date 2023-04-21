import { View, Text } from '@tarojs/components'
import { useLoad, showToast } from '@tarojs/taro'
import './index.less'

export default function Index() {

  useLoad((query) => {
    if (query.interceptor) {
      showToast({
        title: query.interceptor,
        icon: 'none'
      })
    }
  })

  return (
    <View className='index'>
      <Text>Hello world!</Text>
    </View>
  )
}
