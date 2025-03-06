import {
	View,
	Text,
	SafeAreaView,
	FlatList,
	StatusBar,
	Pressable,
	Image,
	Animated,
	Modal,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard
} from 'react-native'
import { router } from 'expo-router'
import React, { useRef, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

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

const menuItemSchema = yup.object({
	name: yup
		.string()
		.required('Ürün adı zorunludur')
		.min(2, 'Ürün adı en az 2 karakter olmalıdır'),
	price: yup
		.string()
		.required('Fiyat zorunludur')
		.matches(/^\d+₺$/, 'Geçerli bir fiyat giriniz (örn: 45₺)'),
	description: yup
		.string()
		.required('Açıklama zorunludur')
		.min(10, 'Açıklama en az 10 karakter olmalıdır'),
	image: yup
		.string()
		.required('Görsel URL zorunludur')
		.url('Geçerli bir URL giriniz'),
	category: yup.string().required('Kategori seçimi zorunludur')
})

type MenuItemFormData = yup.InferType<typeof menuItemSchema>

const MenuScreen = () => {
	const [selectedCategory, setSelectedCategory] = useState<
		string | null
	>(null)
	const scrollY = useRef(new Animated.Value(0)).current
	const [modalVisible, setModalVisible] = useState(false)
	const [newItem, setNewItem] = useState<Partial<MenuItem>>({
		name: '',
		price: '',
		description: '',
		image: '',
		category: ''
	})
	const [showCategoryPicker, setShowCategoryPicker] = useState(false)

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<MenuItemFormData>({
		resolver: yupResolver(menuItemSchema)
	})

	const filteredItems = selectedCategory
		? menuItems.filter((item) => item.category === selectedCategory)
		: menuItems

	const headerOpacity = scrollY.interpolate({
		inputRange: [0, 50],
		outputRange: [1, 0.9],
		extrapolate: 'clamp'
	})

	const onSubmit = (data: MenuItemFormData) => {
		console.log('Yeni ürün:', data)
		setModalVisible(false)
		reset()
	}

	return (
		<SafeAreaView className="flex-1 bg-[#FDF8F3]">
			<StatusBar barStyle="dark-content" />

			<Animated.View
				style={{ opacity: headerOpacity }}
				className="border-b border-[#D2B48C] pb-4 bg-[#FDF8F3] shadow-sm"
			>
				<View className="flex-row justify-between items-center px-6 pt-6">
					<Text className="text-4xl font-bold text-[#4A3428]">
						Menümüz
					</Text>
					<TouchableOpacity
						onPress={() => setModalVisible(true)}
						className="bg-[#8B4513] p-2 rounded-full"
					>
						<AntDesign name="plus" size={24} color="white" />
					</TouchableOpacity>
				</View>

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

			{/* Yeni Menü Ekleme Modalı */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(false)
					reset()
				}}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View className="flex-1 justify-end bg-black/50">
						<View className="bg-white rounded-t-3xl p-6 h-2/3">
							<View className="flex-row justify-between items-center mb-6">
								<Text className="text-2xl font-bold text-[#4A3428]">
									Yeni Ürün Ekle
								</Text>
								<TouchableOpacity
									onPress={() => {
										setModalVisible(false)
										reset()
									}}
								>
									<AntDesign name="close" size={24} color="#4A3428" />
								</TouchableOpacity>
							</View>

							<View className="space-y-4">
								<View>
									<Text className="text-[#7C6355] mb-1">
										Ürün Adı
									</Text>
									<Controller
										control={control}
										name="name"
										render={({ field: { onChange, value } }) => (
											<TextInput
												className={`border border-[#D2B48C] p-3 rounded-lg bg-[#FDF8F3] ${
													errors.name ? 'border-red-500' : ''
												}`}
												placeholder="Ürün adını girin"
												value={value}
												onChangeText={onChange}
											/>
										)}
									/>
									{errors.name && (
										<Text className="text-red-500 text-xs mt-1">
											{errors.name.message}
										</Text>
									)}
								</View>

								<View>
									<Text className="text-[#7C6355] mb-1">Fiyat</Text>
									<Controller
										control={control}
										name="price"
										render={({ field: { onChange, value } }) => (
											<TextInput
												className={`border border-[#D2B48C] p-3 rounded-lg bg-[#FDF8F3] ${
													errors.price ? 'border-red-500' : ''
												}`}
												placeholder="Fiyat (örn: 45₺)"
												value={value}
												onChangeText={onChange}
												keyboardType="numeric"
											/>
										)}
									/>
									{errors.price && (
										<Text className="text-red-500 text-xs mt-1">
											{errors.price.message}
										</Text>
									)}
								</View>

								<View>
									<Text className="text-[#7C6355] mb-1">
										Açıklama
									</Text>
									<Controller
										control={control}
										name="description"
										render={({ field: { onChange, value } }) => (
											<TextInput
												className={`border border-[#D2B48C] p-3 rounded-lg bg-[#FDF8F3] ${
													errors.description ? 'border-red-500' : ''
												}`}
												placeholder="Ürün açıklaması"
												value={value}
												onChangeText={onChange}
												multiline
												numberOfLines={3}
											/>
										)}
									/>
									{errors.description && (
										<Text className="text-red-500 text-xs mt-1">
											{errors.description.message}
										</Text>
									)}
								</View>

								<View>
									<Text className="text-[#7C6355] mb-1">
										Görsel URL
									</Text>
									<Controller
										control={control}
										name="image"
										render={({ field: { onChange, value } }) => (
											<TextInput
												className={`border border-[#D2B48C] p-3 rounded-lg bg-[#FDF8F3] ${
													errors.image ? 'border-red-500' : ''
												}`}
												placeholder="Görsel bağlantısı"
												value={value}
												onChangeText={onChange}
											/>
										)}
									/>
									{errors.image && (
										<Text className="text-red-500 text-xs mt-1">
											{errors.image.message}
										</Text>
									)}
								</View>

								<View>
									<Text className="text-[#7C6355] mb-1">
										Kategori
									</Text>
									<Controller
										control={control}
										name="category"
										render={({ field: { onChange, value } }) => (
											<TouchableOpacity
												className={`border border-[#D2B48C] p-3 rounded-lg bg-[#FDF8F3] flex-row justify-between items-center ${
													errors.category ? 'border-red-500' : ''
												}`}
												onPress={() => setShowCategoryPicker(true)}
											>
												<Text
													className={
														value ? 'text-black' : 'text-gray-400'
													}
												>
													{value || 'Kategori seçin'}
												</Text>
												<AntDesign
													name="down"
													size={16}
													color="#7C6355"
												/>
											</TouchableOpacity>
										)}
									/>
									{errors.category && (
										<Text className="text-red-500 text-xs mt-1">
											{errors.category.message}
										</Text>
									)}
								</View>

								<TouchableOpacity
									className="bg-[#8B4513] py-4 rounded-lg mt-4"
									onPress={handleSubmit(onSubmit)}
								>
									<Text className="text-white font-bold text-center text-lg">
										Ürünü Ekle
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>

			{/* Kategori Seçim Modalı */}
			<Modal
				transparent={true}
				visible={showCategoryPicker}
				animationType="slide"
				onRequestClose={() => setShowCategoryPicker(false)}
			>
				<TouchableWithoutFeedback
					onPress={() => setShowCategoryPicker(false)}
				>
					<View className="flex-1 justify-end bg-black/50">
						<View className="bg-white rounded-t-3xl p-6">
							<Text className="text-2xl font-bold text-[#4A3428] mb-4">
								Kategori Seçin
							</Text>
							{categories.map((category) => (
								<TouchableOpacity
									key={category}
									className="py-3 border-b border-[#D2B48C]"
									onPress={() => {
										setNewItem({ ...newItem, category })
										setShowCategoryPicker(false)
									}}
								>
									<Text className="text-lg text-[#4A3428]">
										{category}
									</Text>
								</TouchableOpacity>
							))}
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</SafeAreaView>
	)
}

export default MenuScreen
