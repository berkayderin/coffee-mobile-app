import {
	View,
	Text,
	ImageBackground,
	Pressable,
	StatusBar,
	Animated,
	useWindowDimensions
} from 'react-native'
import React, { useEffect, useRef } from 'react'
import icedCoffeeImg from '@/assets/images/iced-coffee.png'
import { Link } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'

const AppScreen = () => {
	const fadeAnim = useRef(new Animated.Value(0)).current
	const slideAnim = useRef(new Animated.Value(50)).current

	useEffect(() => {
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true
			}),
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 800,
				useNativeDriver: true
			})
		]).start()
	}, [])

	return (
		<View className="flex-1 bg-[#0A0A0A]">
			<StatusBar barStyle="light-content" />
			<ImageBackground
				source={icedCoffeeImg}
				className="flex-1 justify-between"
				resizeMode="cover"
			>
				<LinearGradient
					colors={[
						'rgba(0,0,0,0.85)',
						'rgba(0,0,0,0.3)',
						'rgba(0,0,0,0.9)'
					]}
					className="absolute h-full w-full"
				/>

				<Animated.View
					className="z-10 pt-16 px-6"
					style={{
						opacity: fadeAnim,
						transform: [{ translateY: slideAnim }]
					}}
				>
					<View className="items-center">
						<Text className="font-bold text-7xl text-white tracking-tight">
							DEEP
						</Text>
						<Text className="font-light text-xl text-white tracking-widest mt-1 uppercase">
							Premium Coffee
						</Text>
						<View className="h-[2px] w-24 bg-amber-400 my-5" />
						<Text className="text-gray-300 text-center text-base max-w-[280px] leading-6 font-light">
							Özel seçilmiş çekirdeklerden hazırlanan eşsiz kahve
							deneyimi
						</Text>
					</View>
				</Animated.View>

				<Animated.View
					className="z-10 px-8 pb-16 gap-5"
					style={{ opacity: fadeAnim }}
				>
					<Link href="/explore" asChild>
						<Pressable className="bg-amber-500 rounded-full py-5 shadow-xl flex-row justify-center items-center">
							<Text className="text-white font-bold text-base text-center tracking-wide mr-2">
								KEŞFET
							</Text>
							<Feather name="arrow-right" size={18} color="white" />
						</Pressable>
					</Link>

					<View className="flex-row gap-4">
						<Link href="/menu" asChild>
							<Pressable className="bg-white/10 backdrop-blur-md flex-1 rounded-2xl py-5 shadow-lg border border-white/20">
								<View className="items-center">
									<Feather name="coffee" size={24} color="#F59E0B" />
									<Text className="text-white font-semibold text-base text-center mt-2">
										MENÜ
									</Text>
								</View>
							</Pressable>
						</Link>

						<Link href="/contact" asChild>
							<Pressable className="bg-white/10 backdrop-blur-md flex-1 rounded-2xl py-5 shadow-lg border border-white/20">
								<View className="items-center">
									<Feather
										name="message-circle"
										size={24}
										color="#F59E0B"
									/>
									<Text className="text-white font-semibold text-base text-center mt-2">
										İLETİŞİM
									</Text>
								</View>
							</Pressable>
						</Link>
					</View>
				</Animated.View>
			</ImageBackground>
		</View>
	)
}

export default AppScreen
