import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Text, View, Button } from 'react-native'
import type { RootStackParamList } from '../../types/routes'

interface SignInScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'SignIn'>
}

export default function SignIn({ navigation }: SignInScreenProps) {
  return (
    <View>
      <Text>Oie</Text>
      <Text>Oie</Text>
      <Button
        title="Go to Sign Up"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  )
}
