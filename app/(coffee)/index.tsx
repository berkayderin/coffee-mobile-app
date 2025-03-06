import {
	View,
	Text,
	ImageBackground,
	Pressable,
	StatusBar
} from 'react-native'
import React from 'react'
import icedCoffeeImg from '@/assets/images/iced-coffee.png'
import { Link } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

const AppScreen = () => {
	return (
		<View className="flex-1 bg-[#121212]">
			<StatusBar barStyle="light-content" />
			<ImageBackground
				source={icedCoffeeImg}
				className="flex-1 justify-between"
				resizeMode="cover"
			>
				<LinearGradient
					colors={[
						'rgba(0,0,0,0.7)',
						'rgba(0,0,0,0.4)',
						'rgba(0,0,0,0.7)'
					]}
					className="absolute h-full w-full"
				/>

				<View className="z-10 pt-16 px-6">
					<View className="items-center">
						<Text className="font-bold text-6xl text-white tracking-tight">
							BREW
						</Text>
						<Text className="font-light text-xl text-white tracking-widest mt-1 uppercase">
							Premium Coffee
						</Text>
						<View className="h-[1px] w-20 bg-amber-400 my-4" />
						<Text className="text-gray-300 text-center text-sm max-w-[250px]">
							Özel seçilmiş çekirdeklerden hazırlanan eşsiz kahve
							deneyimi
						</Text>
					</View>
				</View>

				<View className="z-10 px-8 pb-16 gap-4">
					<Link href="/explore" asChild>
						<Pressable className="bg-amber-500 rounded-full py-4 shadow-lg">
							<Text className="text-white font-bold text-base text-center tracking-wide">
								KEŞFET
							</Text>
						</Pressable>
					</Link>
					<Link href="/menu" asChild>
						<Pressable className="bg-amber-500 rounded-full py-4 shadow-lg">
							<Text className="text-white font-bold text-base text-center tracking-wide">
								MENÜ
							</Text>
						</Pressable>
					</Link>
					<Link href="/contact" asChild>
						<Pressable className="bg-amber-500 rounded-full py-4 shadow-lg">
							<Text className="text-white font-bold text-base text-center tracking-wide">
								İLETIŞİME GEÇ
							</Text>
						</Pressable>
					</Link>
				</View>
			</ImageBackground>
		</View>
	)
}

export default AppScreen
