import {
	View,
	Text,
	SafeAreaView,
	FlatList,
	StatusBar,
	Pressable,
	Image,
	Animated
} from 'react-native'
import { router } from 'expo-router'
import React, { useRef, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'

interface MenuItem {
	id: string
	name: string
	price: string
	description: string
	image: string
	category: string
}

const menuItems: MenuItem[] = [
	{
		id: '1',
		name: 'Espresso',
		price: '30₺',
		description: 'Yoğun kahve deneyimi, özenle kavrulmuş çekirdekler',
		image:
			'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
		category: 'Sıcak İçecekler'
	},
	{
		id: '2',
		name: 'Cappuccino',
		price: '45₺',
		description:
			'Espresso, buharla ısıtılmış süt ve kadifemsi süt köpüğü',
		image:
			'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
		category: 'Sıcak İçecekler'
	},
	{
		id: '3',
		name: 'Latte',
		price: '42₺',
		description: 'Espresso ve bol süt, ipeksi dokuda',
		image:
			'https://images.pexels.com/photos/350478/pexels-photo-350478.jpeg',
		category: 'Sıcak İçecekler'
	},
	{
		id: '4',
		name: 'Soğuk Brew',
		price: '38₺',
		description: '24 saat demlenen özel soğuk kahve',
		image:
			'https://images.pexels.com/photos/2615323/pexels-photo-2615323.jpeg',
		category: 'Soğuk İçecekler'
	},
	{
		id: '5',
		name: 'Türk Kahvesi',
		price: '32₺',
		description: 'Geleneksel yöntemlerle hazırlanan Türk kahvesi',
		image:
			'https://images.pexels.com/photos/14895327/pexels-photo-14895327.jpeg',
		category: 'Geleneksel'
	}
]

const categories = [
	...new Set(menuItems.map((item) => item.category))
]

const MenuScreen = () => {
	const [selectedCategory, setSelectedCategory] = useState<
		string | null
	>(null)
	const scrollY = useRef(new Animated.Value(0)).current

	const filteredItems = selectedCategory
		? menuItems.filter((item) => item.category === selectedCategory)
		: menuItems

	const headerOpacity = scrollY.interpolate({
		inputRange: [0, 50],
		outputRange: [1, 0.9],
		extrapolate: 'clamp'
	})

	return (
		<SafeAreaView className="flex-1 bg-[#FDF8F3]">
			<StatusBar barStyle="dark-content" />

			<Animated.View
				style={{ opacity: headerOpacity }}
				className="border-b border-[#D2B48C] pb-4 bg-[#FDF8F3] shadow-sm"
			>
				<Text className="text-4xl font-bold px-6 pt-6 text-[#4A3428]">
					Menümüz
				</Text>
				<Text className="text-[#7C6355] px-6 mt-2 text-lg">
					Özenle seçilmiş kahve çeşitlerimiz
				</Text>

				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					data={['Tümü', ...categories]}
					keyExtractor={(item) => item}
					renderItem={({ item }) => (
						<Pressable
							onPress={() =>
								setSelectedCategory(item === 'Tümü' ? null : item)
							}
							className={`py-2 px-4 mx-1 rounded-full ${
								(item === 'Tümü' && selectedCategory === null) ||
								item === selectedCategory
									? 'bg-[#8B4513]'
									: 'bg-[#E6D7C3]'
							}`}
						>
							<Text
								className={`font-medium ${
									(item === 'Tümü' && selectedCategory === null) ||
									item === selectedCategory
										? 'text-white'
										: 'text-[#4A3428]'
								}`}
							>
								{item}
							</Text>
						</Pressable>
					)}
					contentContainerStyle={{
						paddingHorizontal: 16,
						paddingTop: 12
					}}
				/>
			</Animated.View>

			<Animated.FlatList
				data={filteredItems}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: true }
				)}
				renderItem={({ item, index }) => {
					const inputRange = [-1, 0, index * 180, (index + 1) * 180]

					const scale = scrollY.interpolate({
						inputRange,
						outputRange: [1, 1, 1, 0.95],
						extrapolate: 'clamp'
					})

					return (
						<Animated.View
							style={{ transform: [{ scale }] }}
							className="bg-white mx-4 mb-4 rounded-2xl shadow-lg overflow-hidden"
						>
							<Image
								source={{ uri: item.image }}
								className="w-full h-32"
								resizeMode="cover"
								onError={(e) =>
									console.log(
										'Resim yükleme hatası:',
										e.nativeEvent.error
									)
								}
							/>
							<View className="p-4 border-l-4 border-[#8B4513]">
								<View className="flex-row justify-between items-start">
									<Text className="text-2xl font-bold text-[#4A3428] flex-1">
										{item.name}
									</Text>
									<View className="bg-[#F5EDE3] px-3 py-1 rounded-full">
										<Text className="text-[#8B4513] font-bold">
											{item.price}
										</Text>
									</View>
								</View>
								<Text className="text-[#7C6355] mt-2 text-base">
									{item.description}
								</Text>
								<Text className="text-[#A89078] text-sm mt-1">
									{item.category}
								</Text>
								<View className="flex-row justify-between items-center mt-3">
									<Pressable
										className="flex-row items-center"
										onPress={() => {
											/* Favorilere ekle */
										}}
									>
										<AntDesign
											name="heart"
											size={18}
											color="#D2B48C"
										/>
										<Text className="text-[#A89078] ml-1">
											Favori
										</Text>
									</Pressable>

									<Pressable
										className="bg-[#8B4513] py-2 px-4 rounded-lg flex-row items-center active:opacity-80"
										onPress={() => {
											router.push(`/${item.id}`)
										}}
									>
										<Text className="text-white font-medium mr-1">
											Detayları Gör
										</Text>
										<AntDesign
											name="arrowright"
											size={16}
											color="white"
										/>
									</Pressable>
								</View>
							</View>
						</Animated.View>
					)
				}}
				ListEmptyComponent={() => (
					<View className="flex-1 justify-center items-center p-8">
						<AntDesign name="rest" size={48} color="#D2B48C" />
						<Text className="text-[#7C6355] text-lg mt-4 text-center">
							Bu kategoride henüz ürün bulunmuyor.
						</Text>
					</View>
				)}
				keyExtractor={(item) => item.id}
				className="pt-4"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 20 }}
			/>
		</SafeAreaView>
	)
}

export default MenuScreen
