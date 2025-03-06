import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import icedCoffeeImg from '@/assets/images/iced-coffee.png'

const app = () => {
	return (
		<View className="flex-1 flex-col">
			<ImageBackground
				source={icedCoffeeImg}
				className="flex-1"
				resizeMode="cover"
				imageStyle={{ opacity: 0.5 }}
			>
				<Text className="font-semibold text-2xl text-center bg-black text-white">
					coffee shop
				</Text>
			</ImageBackground>
		</View>
	)
}

export default app
