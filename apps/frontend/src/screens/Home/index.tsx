import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Text, View, Button } from 'react-native'
import { RootStackParamList } from '../../types/routes'

interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

export default function Home({ navigation }: HomeScreenProps) {
  return (
    <View>
      <Text className="">OIEEEE</Text>
      <Button
        title="Go to Sign Up"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  )
}
