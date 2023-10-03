/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect } from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { HttpStatusCode } from 'axios'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { SignInSchemaProps, signInSchema } from '../../schemas/signInSchema'
import { RootStackParamList } from '../../types/routes'
import { StackNavigationProp } from '@react-navigation/stack'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

export default function SignUp() {
  const navigation = useNavigation<HomeScreenNavigationProp>()

  const [fontsLoaded] = useFonts({
    'Poppins-Black': require('../../../assets/fonts/Poppins-Black.ttf'),
    'Poppins-ExtraBold': require('../../../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-Bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Light': require('../../../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Thin': require('../../../assets/fonts/Poppins-Thin.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  useEffect(() => {
    if (!fontsLoaded) {
      console.log('error')
    }
  }, [fontsLoaded])

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<SignInSchemaProps>({
    resolver: zodResolver(signInSchema),
  })

  const handleSubmitSignIn = async ({
    username,
    email,
    password,
  }: SignInSchemaProps) => {
    try {
      const res = await axios.post('http://10.0.0.184:4000/users/sign-up', {
        username,
        email,
        password,
      })

      if (res.status !== HttpStatusCode.Created) {
        return ''
      }

      const newUser = {
        username,
        email,
      }

      navigation.navigate('Home')
      AsyncStorage.setItem('auth-system', JSON.stringify(newUser))
    } catch (error) {
      console.error('Erro ao criar pessoa', error)
    }
  }

  return (
    <View
      className="flex-1 flex-col items-center gap-y-4 px-2  py-10"
      onLayout={onLayoutRootView}
    >
      <Text
        style={{ fontFamily: 'Poppins-Bold' }}
        className="text-4xl text-center text-indigo-600"
      >
        Welcome to the new Wordl!
      </Text>
      <Text
        style={{ fontFamily: 'Poppins-Regular' }}
        // style={stylesFontPoppins.fontPoppinsRegular}
        className="text-center w-full"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Text>
      {/* <Image
        source={require('../../assets/images/Sign-In-Image.png')}
        style={{ width: 157.65, height: 110 }}
        alt="Image"
      /> */}
      <View className="w-full gap-y-8 flex-col justify-center items-center">
        <View className="w-full justify-center flex-col gap-y-2">
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value, onBlur } }) => (
              <>
                <Ionicons
                  name="people-outline"
                  size={24}
                  color={'rgb(79 70 229)'}
                />

                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  // style={stylesFontPoppins.fontPoppinsRegular}
                  value={value}
                  placeholder="Your Username"
                  className={`w-full border border-zinc-400 py-3 px-2 rounded-xl ${
                    errors.username && 'border-red-500'
                  }`}
                />
              </>
            )}
          />
          {!!errors.username?.message && (
            <Text className="text-xs text-red-500">
              {errors.username.message}
            </Text>
          )}
        </View>
        <View className="w-full justify-center flex-col gap-y-2">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                // style={stylesFontPoppins.fontPoppinsRegular}
                value={value}
                placeholder="Your Email"
                className={`w-full border border-zinc-400 py-3 px-2 rounded-xl ${
                  errors.email && 'border-red-500'
                }`}
              />
            )}
          />
          {!!errors.email?.message && (
            <Text className="text-xs text-red-500">{errors.email.message}</Text>
          )}
        </View>
        <View className="w-full justify-center flex-col gap-y-2">
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                // style={stylesFontPoppins.fontPoppinsRegular}
                placeholder="Your Password"
                className={`w-full border border-zinc-400 py-3 px-2 rounded-xl ${
                  errors.password && 'border-red-500'
                }`}
                secureTextEntry={true}
              />
            )}
          />
          {!!errors.password?.message && (
            <Text className="text-xs text-red-500">
              {errors.password.message}
            </Text>
          )}
        </View>

        <TouchableOpacity
          disabled={isSubmitting}
          className="w-full bg-indigo-600 rounded-xl p-3"
          onPress={handleSubmit(handleSubmitSignIn)}
        >
          <Text
            // style={stylesFontPoppins.fontPoppinsBold}
            className="text-center text-xl text-white"
          >
            Sign-Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
