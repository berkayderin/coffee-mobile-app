import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import icedCoffeeImg from '@/assets/images/iced-coffee.png'
import { Link } from 'expo-router'

const app = () => {
	return (
		<View className="flex-1 flex-col">
			<ImageBackground
				source={icedCoffeeImg}
				className="flex-1"
				resizeMode="cover"
			>
				<Text className="font-semibold text-2xl text-center bg-black text-white">
					coffee shop
				</Text>
				<Link href="/explore" className="mt-10">
					<Text className="bg-red-500 font-semibold text-2xl text-center text-white">
						Explore Go
					</Text>
				</Link>
			</ImageBackground>
		</View>
	)
}

export default app
