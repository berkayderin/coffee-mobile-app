import {
	View,
	Text,
	ImageBackground,
	Pressable,
	StatusBar,
	Animated
} from 'react-native'
import React, { useEffect, useRef } from 'react'
import icedCoffeeImg from '@/assets/images/iced-coffee.png'
import { Link } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'

const AppScreen = () => {
	const fadeAnim = useRef(new Animated.Value(0)).current
	const slideAnim = useRef(new Animated.Value(50)).current
	const scaleAnim = useRef(new Animated.Value(0.95)).current
	const titleFade = useRef(new Animated.Value(0)).current
	const subtitleFade = useRef(new Animated.Value(0)).current
	const descFade = useRef(new Animated.Value(0)).current
	const buttonsFade = useRef(new Animated.Value(0)).current

	useEffect(() => {
		Animated.sequence([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 800,
				useNativeDriver: true
			}),
			Animated.stagger(200, [
				Animated.timing(titleFade, {
					toValue: 1,
					duration: 600,
					useNativeDriver: true
				}),
				Animated.timing(subtitleFade, {
					toValue: 1,
					duration: 600,
					useNativeDriver: true
				}),
				Animated.timing(descFade, {
					toValue: 1,
					duration: 600,
					useNativeDriver: true
				}),
				Animated.parallel([
					Animated.timing(buttonsFade, {
						toValue: 1,
						duration: 800,
						useNativeDriver: true
					}),
					Animated.spring(scaleAnim, {
						toValue: 1,
						friction: 8,
						tension: 40,
						useNativeDriver: true
					}),
					Animated.timing(slideAnim, {
						toValue: 0,
						duration: 800,
						useNativeDriver: true
					})
				])
			])
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
						'rgba(0,0,0,0.75)',
						'rgba(0,0,0,0.2)',
						'rgba(10,10,10,0.95)'
					]}
					className="absolute h-full w-full"
				/>

				<Animated.View
					className="z-10 pt-20 px-6"
					style={{
						opacity: fadeAnim,
						transform: [{ translateY: slideAnim }]
					}}
				>
					<View className="items-center">
						<Animated.Text
							style={{ opacity: titleFade }}
							className="font-bold text-8xl text-white tracking-tighter"
						>
							DEEP
						</Animated.Text>
						<Animated.Text
							style={{ opacity: subtitleFade }}
							className="font-light text-xl text-white tracking-[6px] mt-1 uppercase"
						>
							Premium Coffee
						</Animated.Text>
						<Animated.View
							style={{
								opacity: subtitleFade,
								transform: [{ scaleX: scaleAnim }]
							}}
							className="h-[2px] w-32 bg-amber-400 my-6"
						/>
						<Animated.Text
							style={{ opacity: descFade }}
							className="text-gray-200 text-center text-xl max-w-[300px] leading-6 font-light"
						>
							Özel seçilmiş çekirdeklerden hazırlanan eşsiz kahve
							deneyimi
						</Animated.Text>
					</View>
				</Animated.View>

				<Animated.View
					className="z-10 px-8 pb-20 gap-6"
					style={{
						opacity: buttonsFade,
						transform: [
							{ translateY: Animated.multiply(slideAnim, -1) }
						]
					}}
				>
					<View className="flex-row gap-5">
						<Link href="/coffee" asChild>
							<Pressable className="bg-white/5 backdrop-blur-md flex-1 rounded-3xl py-6 shadow-lg border border-white/10 overflow-hidden">
								<BlurView
									intensity={20}
									className="absolute inset-0"
								/>
								<View className="items-center">
									<Feather name="coffee" size={26} color="#F59E0B" />
									<Text className="text-white font-medium text-base text-center mt-3 tracking-wider">
										MENÜ
									</Text>
								</View>
							</Pressable>
						</Link>

						<Link href="/contact" asChild>
							<Pressable className="bg-white/5 backdrop-blur-md flex-1 rounded-3xl py-6 shadow-lg border border-white/10 overflow-hidden">
								<BlurView
									intensity={20}
									className="absolute inset-0"
								/>
								<View className="items-center">
									<Feather
										name="message-circle"
										size={26}
										color="#F59E0B"
									/>
									<Text className="text-white font-medium text-base text-center mt-3 tracking-wider">
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
