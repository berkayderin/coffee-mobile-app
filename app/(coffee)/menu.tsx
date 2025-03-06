import {
	View,
	Text,
	SafeAreaView,
	FlatList,
	StatusBar
} from 'react-native'
import React from 'react'

interface MenuItem {
	id: string
	name: string
	price: string
	description: string
}

const menuItems: MenuItem[] = [
	{
		id: '1',
		name: 'Espresso',
		price: '30₺',
		description: 'Yoğun kahve deneyimi'
	},
	{
		id: '2',
		name: 'Cappuccino',
		price: '45₺',
		description: 'Espresso, buharla ısıtılmış süt ve süt köpüğü'
	},
	{
		id: '3',
		name: 'Latte',
		price: '42₺',
		description: 'Espresso ve bol süt'
	}
]

const MenuScreen = () => {
	return (
		<SafeAreaView className="flex-1 bg-gray-100">
			<StatusBar barStyle="dark-content" />
			<View className="border-b border-gray-200 pb-4 bg-white shadow-sm">
				<Text className="text-4xl font-bold px-6 pt-6 text-gray-900">
					Menümüz
				</Text>
				<Text className="text-gray-600 px-6 mt-2 text-lg">
					Özenle seçilmiş kahve çeşitlerimiz
				</Text>
			</View>
			<View className="p-5">
				<FlatList
					data={menuItems}
					renderItem={({ item }) => (
						<View className="bg-white mx-4 mb-2 p-6 rounded-xl shadow-lg border-l-4 border-green-500">
							<View className="flex-row justify-between items-start">
								<Text className="text-2xl font-bold text-gray-900 flex-1">
									{item.name}
								</Text>
								<Text className="text-green-600 font-bold text-xl ml-4">
									{item.price}
								</Text>
							</View>
							<Text className="text-gray-700 mt-2 text-base">
								{item.description}
							</Text>
						</View>
					)}
					ListEmptyComponent={() => (
						<View className="flex-1 justify-center items-center">
							<Text className="text-gray-600 text-lg">
								Menümüzde henüz ürün yok.
							</Text>
						</View>
					)}
					keyExtractor={(item) => item.id}
					className="pt-4"
					showsVerticalScrollIndicator={false}
					ItemSeparatorComponent={() => <View className="h-2" />}
				/>
			</View>
		</SafeAreaView>
	)
}

export default MenuScreen
