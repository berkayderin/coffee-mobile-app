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
	Keyboard,
	ScrollView
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

			{/* Header */}
			<Animated.View
				style={{ opacity: headerOpacity }}
				className="pt-6 pb-4 bg-white shadow-md rounded-b-3xl"
			>
				<View className="flex-row justify-between items-center px-6">
					<View className="flex-row items-center">
						<TouchableOpacity
							onPress={() => router.push('/')}
							className="bg-[#F9F5F0] p-2.5 rounded-full mr-3"
						>
							<AntDesign name="arrowleft" size={22} color="#A06235" />
						</TouchableOpacity>
						<View>
							<Text className="text-4xl font-bold text-[#3D2314] tracking-tight">
								Menümüz
							</Text>
							<Text className="text-[#9E7D65] text-base mt-1">
								Özenle hazırlanan kahvelerimiz
							</Text>
						</View>
					</View>

					<TouchableOpacity
						onPress={() => setModalVisible(true)}
						className="bg-[#A06235] p-3 rounded-2xl"
					>
						<AntDesign name="plus" size={24} color="white" />
					</TouchableOpacity>
				</View>

				{/* Kategori Seçici */}
				<View className="mt-6 px-2">
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
								className={`py-3 px-5 mx-1.5 rounded-xl ${
									(item === 'Tümü' && selectedCategory === null) ||
									item === selectedCategory
										? 'bg-[#A06235]'
										: 'bg-white border border-[#E6D7C3]'
								}`}
							>
								<Text
									className={`font-semibold ${
										(item === 'Tümü' && selectedCategory === null) ||
										item === selectedCategory
											? 'text-white'
											: 'text-[#7C6355]'
									}`}
								>
									{item}
								</Text>
							</Pressable>
						)}
						contentContainerStyle={{
							paddingHorizontal: 16,
							paddingBottom: 8
						}}
					/>
				</View>
			</Animated.View>

			{/* Ürün Listesi */}
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
							className="mx-4 my-4 rounded-3xl shadow-md overflow-hidden bg-white border border-[#F0E6D6]"
						>
							<View className="relative">
								<Image
									source={{ uri: item.image }}
									className="w-full h-48"
									resizeMode="cover"
								/>
								<View className="absolute inset-0 bg-black/30" />
								<View className="absolute top-4 right-4 bg-white/90 px-3 py-1.5 rounded-full shadow-sm">
									<Text className="text-[#8B4513] font-bold text-base">
										{item.price}
									</Text>
								</View>
								<View className="absolute bottom-0 w-full p-4">
									<Text className="text-white text-xs font-medium bg-[#A06235] self-start px-3 py-1 rounded-full mb-1">
										{item.category}
									</Text>
									<Text className="text-white text-2xl font-bold drop-shadow-lg">
										{item.name}
									</Text>
								</View>
							</View>

							<View className="p-4">
								<Text className="text-[#5D4037] text-base leading-relaxed">
									{item.description}
								</Text>

								<View className="flex-row justify-between items-center mt-4">
									<View className="flex-row gap-2">
										<TouchableOpacity className="bg-[#F9F5F0] p-2.5 rounded-full">
											<AntDesign
												name="heart"
												size={20}
												color="#D2691E"
											/>
										</TouchableOpacity>
										<TouchableOpacity className="bg-[#F9F5F0] p-2.5 rounded-full">
											<AntDesign
												name="sharealt"
												size={20}
												color="#D2691E"
											/>
										</TouchableOpacity>
									</View>

									<Pressable
										className="bg-[#A06235] py-2.5 px-5 rounded-xl flex-row items-center space-x-2"
										onPress={() => {
											router.push(`/${item.id}`)
										}}
									>
										<Text className="text-white font-semibold">
											İncele
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
					<View className="flex-1 justify-center items-center p-8 mt-12">
						<View className="bg-[#F5EDE3] p-6 rounded-full mb-4">
							<AntDesign name="rest" size={56} color="#A06235" />
						</View>
						<Text className="text-[#7C6355] text-xl mt-4 text-center font-medium">
							Bu kategoride henüz ürün bulunmuyor.
						</Text>
						<Text className="text-[#9E8570] text-center mt-2">
							Başka bir kategori seçmeyi deneyin.
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
					<View className="flex-1 justify-end bg-black/60">
						<View className="bg-white rounded-t-3xl p-6 max-h-[85%]">
							<View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-6" />

							<View className="flex-row justify-between items-center mb-5">
								<Text className="text-3xl font-bold text-[#3D2314]">
									Yeni Ürün
								</Text>
								<TouchableOpacity
									onPress={() => {
										setModalVisible(false)
										reset()
									}}
									className="bg-[#F9F5F0] p-2 rounded-full"
								>
									<AntDesign name="close" size={24} color="#A06235" />
								</TouchableOpacity>
							</View>

							<ScrollView className="mb-4">
								<View className="space-y-4">
									<View>
										<Text className="text-[#7C6355] font-medium mb-2 text-base">
											Ürün Adı
										</Text>
										<Controller
											control={control}
											name="name"
											render={({ field: { onChange, value } }) => (
												<TextInput
													className={`border-2 ${
														errors.name
															? 'border-red-500'
															: 'border-[#E6D7C3]'
													} p-4 rounded-xl bg-[#FDFBF7] text-base`}
													placeholder="Örn: Filtre Kahve"
													value={value}
													onChangeText={onChange}
												/>
											)}
										/>
										{errors.name && (
											<Text className="text-red-500 text-xs mt-1.5">
												{errors.name.message}
											</Text>
										)}
									</View>

									<View>
										<Text className="text-[#7C6355] font-medium mb-2 text-base">
											Fiyat
										</Text>
										<Controller
											control={control}
											name="price"
											render={({ field: { onChange, value } }) => (
												<TextInput
													className={`border-2 ${
														errors.price
															? 'border-red-500'
															: 'border-[#E6D7C3]'
													} p-4 rounded-xl bg-[#FDFBF7] text-base`}
													placeholder="Örn: 45₺"
													value={value}
													onChangeText={onChange}
													keyboardType="numeric"
												/>
											)}
										/>
										{errors.price && (
											<Text className="text-red-500 text-xs mt-1.5">
												{errors.price.message}
											</Text>
										)}
									</View>

									<View>
										<Text className="text-[#7C6355] font-medium mb-2 text-base">
											Açıklama
										</Text>
										<Controller
											control={control}
											name="description"
											render={({ field: { onChange, value } }) => (
												<TextInput
													className={`border-2 ${
														errors.description
															? 'border-red-500'
															: 'border-[#E6D7C3]'
													} p-4 rounded-xl bg-[#FDFBF7] text-base`}
													placeholder="Ürün açıklaması"
													value={value}
													onChangeText={onChange}
													multiline
													numberOfLines={3}
												/>
											)}
										/>
										{errors.description && (
											<Text className="text-red-500 text-xs mt-1.5">
												{errors.description.message}
											</Text>
										)}
									</View>

									<View>
										<Text className="text-[#7C6355] font-medium mb-2 text-base">
											Görsel URL
										</Text>
										<Controller
											control={control}
											name="image"
											render={({ field: { onChange, value } }) => (
												<TextInput
													className={`border-2 ${
														errors.image
															? 'border-red-500'
															: 'border-[#E6D7C3]'
													} p-4 rounded-xl bg-[#FDFBF7] text-base`}
													placeholder="Görsel bağlantısı"
													value={value}
													onChangeText={onChange}
												/>
											)}
										/>
										{errors.image && (
											<Text className="text-red-500 text-xs mt-1.5">
												{errors.image.message}
											</Text>
										)}
									</View>

									<View>
										<Text className="text-[#7C6355] font-medium mb-2 text-base">
											Kategori
										</Text>
										<Controller
											control={control}
											name="category"
											render={({ field: { onChange, value } }) => (
												<TouchableOpacity
													className={`border-2 ${
														errors.category
															? 'border-red-500'
															: 'border-[#E6D7C3]'
													} p-4 rounded-xl bg-[#FDFBF7] flex-row justify-between items-center`}
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
											<Text className="text-red-500 text-xs mt-1.5">
												{errors.category.message}
											</Text>
										)}
									</View>
								</View>
							</ScrollView>

							<TouchableOpacity
								className="bg-[#A06235] py-4 rounded-xl mt-2"
								onPress={handleSubmit(onSubmit)}
							>
								<Text className="text-white font-bold text-center text-lg">
									Ürünü Ekle
								</Text>
							</TouchableOpacity>
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
