import {
	View,
	Text,
	SafeAreaView,
	StatusBar,
	ScrollView,
	Image,
	Pressable
} from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

const menuItems = {
	'1': {
		id: '1',
		name: 'Espresso',
		price: '30₺',
		description: 'Yoğun kahve deneyimi',
		image:
			'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
		longDescription:
			'Taze çekilmiş kahve çekirdeklerinden hazırlanan, yoğun aromaya sahip geleneksel İtalyan espresso. Özenle seçilmiş kahve çekirdekleri ile hazırlanır.',
		ingredients: ['Premium kahve çekirdekleri', 'Filtered su'],
		preparationTime: '2-3 dakika',
		category: 'Sıcak İçecekler'
	},
	'2': {
		id: '2',
		name: 'Cappuccino',
		price: '45₺',
		description: 'Espresso, buharla ısıtılmış süt ve süt köpüğü',
		image:
			'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
		longDescription:
			'Klasik İtalyan kahvesi, eşit oranda espresso, sıcak süt ve kadifemsi süt köpüğünden oluşur. Üzerine isteğe bağlı tarçın serpilir.',
		ingredients: [
			'Espresso',
			'Taze süt',
			'Süt köpüğü',
			'Tarçın (opsiyonel)'
		],
		preparationTime: '4-5 dakika',
		category: 'Sıcak İçecekler'
	},
	'3': {
		id: '3',
		name: 'Latte',
		price: '42₺',
		description: 'Espresso ve bol süt',
		image:
			'https://images.pexels.com/photos/350478/pexels-photo-350478.jpeg',
		longDescription:
			'Yumuşak içimli, bol sütlü bir kahve deneyimi. Espresso üzerine bol miktarda buharlanmış süt ve ince bir tabaka süt köpüğü ile hazırlanır.',
		ingredients: ['Espresso', 'Buharlanmış süt', 'İnce süt köpüğü'],
		preparationTime: '4-5 dakika',
		category: 'Sıcak İçecekler'
	}
}

const CoffeeDetailScreen = () => {
	const { id } = useLocalSearchParams()
	const coffee = menuItems[id as keyof typeof menuItems]

	if (!coffee) {
		return (
			<SafeAreaView className="flex-1 bg-[#FDF8F3]">
				<View className="flex-1 justify-center items-center">
					<AntDesign name="warning" size={48} color="#D2B48C" />
					<Text className="text-xl text-[#7C6355] mt-4">
						Kahve bulunamadı
					</Text>
				</View>
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView className="flex-1 bg-[#FDF8F3]">
			<StatusBar barStyle="dark-content" />
			<ScrollView className="flex-1">
				<Pressable
					onPress={() => router.back()}
					className="absolute left-4 top-4 z-10 bg-white/80 p-2 rounded-full"
				>
					<AntDesign name="arrowleft" size={24} color="#4A3428" />
				</Pressable>

				<Image
					source={{ uri: coffee.image }}
					className="w-full h-64"
					resizeMode="cover"
				/>

				<View className="p-6 -mt-6 bg-[#FDF8F3] rounded-t-3xl">
					<View className="flex-row justify-between items-center">
						<Text className="text-3xl font-bold text-[#4A3428] flex-1">
							{coffee.name}
						</Text>
						<View className="bg-[#F5EDE3] px-4 py-2 rounded-full">
							<Text className="text-[#8B4513] font-bold text-lg">
								{coffee.price}
							</Text>
						</View>
					</View>

					<Text className="mt-2 text-[#A89078] font-medium">
						{coffee.category}
					</Text>

					<Text className="mt-4 text-[#7C6355] text-lg leading-relaxed">
						{coffee.longDescription}
					</Text>

					<View className="mt-6 bg-white p-4 rounded-2xl shadow-sm">
						<Text className="text-xl font-bold text-[#4A3428] mb-3">
							Malzemeler
						</Text>
						{coffee.ingredients.map((ingredient, index) => (
							<View
								key={index}
								className="flex-row items-center mb-2"
							>
								<View className="w-2 h-2 rounded-full bg-[#8B4513] mr-3" />
								<Text className="text-[#7C6355] text-lg">
									{ingredient}
								</Text>
							</View>
						))}
					</View>

					<View className="mt-4 bg-white p-4 rounded-2xl shadow-sm">
						<Text className="text-xl font-bold text-[#4A3428] mb-2">
							Hazırlanma Süresi
						</Text>
						<View className="flex-row items-center">
							<AntDesign
								name="clockcircle"
								size={20}
								color="#8B4513"
							/>
							<Text className="text-[#7C6355] text-lg ml-2">
								{coffee.preparationTime}
							</Text>
						</View>
					</View>

					<Pressable className="mt-6 bg-[#8B4513] py-4 rounded-xl flex-row justify-center items-center active:opacity-80">
						<Text className="text-white font-bold text-lg">
							Favoriye Ekle
						</Text>
					</Pressable>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default CoffeeDetailScreen
