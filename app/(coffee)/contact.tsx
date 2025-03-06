import React, { useState } from 'react'
import {
	View,
	Text,
	TextInput,
	Pressable,
	ScrollView,
	ActivityIndicator,
	Alert,
	StatusBar,
	KeyboardAvoidingView,
	Platform
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'expo-router'

const contactSchema = yup.object({
	name: yup
		.string()
		.required('İsim alanı zorunludur')
		.min(2, 'Ad en az 2 karakter olmalıdır'),
	email: yup
		.string()
		.required('E-posta alanı zorunludur')
		.email('Geçerli bir e-posta adresi giriniz'),
	message: yup
		.string()
		.required('Mesaj alanı zorunludur')
		.min(10, 'Mesaj en az 10 karakter olmalıdır')
})

type ContactFormData = yup.InferType<typeof contactSchema>

export default function Contact() {
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ContactFormData>({
		resolver: yupResolver(contactSchema),
		defaultValues: {
			name: '',
			email: '',
			message: ''
		}
	})

	const onSubmit = (data: ContactFormData) => {
		setLoading(true)

		setTimeout(() => {
			setLoading(false)
			Alert.alert(
				'Teşekkürler',
				'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.'
			)
			reset()
		}, 1500)
	}

	return (
		<SafeAreaView className="flex-1 bg-[#0A0A0A]">
			<StatusBar barStyle="light-content" />
			<LinearGradient
				colors={['#0A0A0A', '#1A1A1A']}
				className="absolute h-full w-full"
			/>

			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				className="flex-1"
			>
				<ScrollView
					className="flex-1"
					contentContainerStyle={{ flexGrow: 1 }}
				>
					<Pressable
						className="px-6 py-4 flex-row items-center"
						onPress={() => router.back()}
					>
						<Feather name="arrow-left" size={24} color="white" />
						<Text className="text-white text-xl font-semibold ml-4">
							İletişim
						</Text>
					</Pressable>

					<View className="px-6 mt-6">
						<Text className="text-amber-400 text-2xl font-bold mb-1">
							Bize Ulaşın
						</Text>
						<Text className="text-gray-300 mb-6">
							Sorularınız ve önerileriniz için bizimle iletişime
							geçebilirsiniz.
						</Text>

						<View className="mb-8">
							<View className="flex-row items-center bg-white/10 p-4 rounded-xl mb-4">
								<View className="bg-amber-500/20 p-3 rounded-full mr-4">
									<Feather name="phone" size={20} color="#F59E0B" />
								</View>
								<View>
									<Text className="text-gray-400 text-xs">
										Telefon
									</Text>
									<Text className="text-white text-base">
										+90 555 123 4567
									</Text>
								</View>
							</View>

							<View className="flex-row items-center bg-white/10 p-4 rounded-xl mb-4">
								<View className="bg-amber-500/20 p-3 rounded-full mr-4">
									<Feather name="mail" size={20} color="#F59E0B" />
								</View>
								<View>
									<Text className="text-gray-400 text-xs">
										E-posta
									</Text>
									<Text className="text-white text-base">
										iletisim@coffeeshop.com
									</Text>
								</View>
							</View>

							<View className="flex-row items-center bg-white/10 p-4 rounded-xl">
								<View className="bg-amber-500/20 p-3 rounded-full mr-4">
									<Feather name="map-pin" size={20} color="#F59E0B" />
								</View>
								<View>
									<Text className="text-gray-400 text-xs">Adres</Text>
									<Text className="text-white text-base">
										Bağdat Caddesi No: 123
									</Text>
									<Text className="text-white text-base">
										Kadıköy, İstanbul
									</Text>
								</View>
							</View>
						</View>

						<Text className="text-amber-400 text-xl font-bold mb-4">
							Mesaj Gönder
						</Text>

						<View className="mb-4">
							<Text className="text-gray-300 mb-2 text-sm">
								Adınız
							</Text>
							<Controller
								control={control}
								name="name"
								render={({ field: { onChange, value } }) => (
									<TextInput
										className={`bg-white/10 rounded-xl p-4 text-white ${
											errors.name ? 'border border-red-500' : ''
										}`}
										value={value}
										onChangeText={onChange}
										placeholder="Adınızı giriniz"
										placeholderTextColor="#6b7280"
									/>
								)}
							/>
							{errors.name && (
								<Text className="text-red-500 mt-1 text-xs">
									{errors.name.message}
								</Text>
							)}
						</View>

						<View className="mb-4">
							<Text className="text-gray-300 mb-2 text-sm">
								E-posta
							</Text>
							<Controller
								control={control}
								name="email"
								render={({ field: { onChange, value } }) => (
									<TextInput
										className={`bg-white/10 rounded-xl p-4 text-white ${
											errors.email ? 'border border-red-500' : ''
										}`}
										value={value}
										onChangeText={onChange}
										placeholder="E-posta adresinizi giriniz"
										placeholderTextColor="#6b7280"
										keyboardType="email-address"
										autoCapitalize="none"
									/>
								)}
							/>
							{errors.email && (
								<Text className="text-red-500 mt-1 text-xs">
									{errors.email.message}
								</Text>
							)}
						</View>

						<View className="mb-6">
							<Text className="text-gray-300 mb-2 text-sm">
								Mesajınız
							</Text>
							<Controller
								control={control}
								name="message"
								render={({ field: { onChange, value } }) => (
									<TextInput
										className={`bg-white/10 rounded-xl p-4 text-white h-32 ${
											errors.message ? 'border border-red-500' : ''
										}`}
										value={value}
										onChangeText={onChange}
										placeholder="Mesajınızı giriniz"
										placeholderTextColor="#6b7280"
										multiline
										textAlignVertical="top"
									/>
								)}
							/>
							{errors.message && (
								<Text className="text-red-500 mt-1 text-xs">
									{errors.message.message}
								</Text>
							)}
						</View>

						<Pressable
							className="bg-amber-500 rounded-full py-4 mb-8"
							onPress={handleSubmit(onSubmit)}
							disabled={loading}
						>
							{loading ? (
								<ActivityIndicator color="white" />
							) : (
								<Text className="text-white font-bold text-center">
									GÖNDER
								</Text>
							)}
						</Pressable>
					</View>

					<View className="mt-auto px-6 pb-6">
						<View className="flex-row justify-center gap-4 mb-4">
							<View className="bg-white/10 p-3 rounded-full">
								<Feather name="instagram" size={20} color="#F59E0B" />
							</View>
							<View className="bg-white/10 p-3 rounded-full">
								<Feather name="facebook" size={20} color="#F59E0B" />
							</View>
							<View className="bg-white/10 p-3 rounded-full">
								<Feather name="twitter" size={20} color="#F59E0B" />
							</View>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
