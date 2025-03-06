import { Link, Stack } from 'expo-router'
import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: '404', headerShown: false }} />
			<View className="flex-1 bg-[#0A0A0A]">
				<LinearGradient
					colors={[
						'rgba(180,83,9,0.1)',
						'rgba(0,0,0,0)',
						'rgba(180,83,9,0.05)'
					]}
					className="absolute h-full w-full"
				/>

				<View className="flex-1 justify-center items-center px-6">
					<View className="items-center">
						<View className="bg-white/5 rounded-3xl px-8 py-6 mb-8">
							<Text className="text-amber-500 font-bold text-7xl text-center">
								404
							</Text>
						</View>

						<Text className="text-2xl font-bold text-white text-center tracking-tight">
							SAYFA BULUNAMADI
						</Text>

						<View className="flex-row items-center my-5">
							<View className="h-[1px] w-10 bg-amber-500/40" />
							<View className="h-2 w-2 rounded-full bg-amber-500 mx-2" />
							<View className="h-[1px] w-10 bg-amber-500/40" />
						</View>

						<Text className="text-gray-400 text-center mb-10 max-w-[280px] leading-5">
							Aradığınız içerik taşınmış veya kaldırılmış olabilir.
						</Text>

						<Link href="/">
							<View className="bg-amber-500 rounded-lg py-3.5 px-10 shadow-sm">
								<Text className="text-white font-medium text-center text-base">
									Ana Sayfaya Dön
								</Text>
							</View>
						</Link>
					</View>
				</View>
			</View>
		</>
	)
}
