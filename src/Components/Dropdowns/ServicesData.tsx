import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface Service {
  id: number
  name: string
  price: string
}

const services: Service[] = [
  { id: 1, name: 'Haircut(Walk in)', price: '₱150' },
  { id: 2, name: 'Reservation(Walk in)', price: '₱200' },
  { id: 3, name: 'Haircut/Wash', price: '₱250' },
  { id: 4, name: 'Haircut/Hot Towel', price: '₱250' },
  { id: 5, name: 'Hairdye/Haircut', price: '₱350' },
  { id: 6, name: 'Hair color/Haircut', price: '₱400' },
  { id: 7, name: 'Highlights/Haircut', price: '₱500' },
  { id: 8, name: 'Balyage/Haircut', price: '₱500' },
  { id: 9, name: 'Bleaching/Haircut', price: '₱800' },
  { id: 10, name: 'Perm/Haircut', price: '₱1000' },
  { id: 11, name: 'Rebond/ShortHair', price: '₱1000' },
  { id: 12, name: 'Rebound/LongHair', price: '₱1500' }
]

export default function ServicesData() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const selectService = (service: Service) => {
    setSelectedService(service)
    setIsDropdownOpen(false)
  }

  return (
    <View className="relative w-full max-w-md">
      {/* Dropdown Trigger */}
      <TouchableOpacity
        onPress={toggleDropdown}
        className="flex-row items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm"
      >
        <Text className="text-lg font-satoshibold">
          {selectedService ? `${selectedService.price} - ${selectedService.name}` : 'Select your service'}
        </Text>
        <Icon 
          name={isDropdownOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
          size={26} 
          color="black"
          className="absolute right-3"
        />
      </TouchableOpacity>

      {/* Dropdown Options */}
      {isDropdownOpen && (
        <View className="absolute top-12 left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10" style={{ maxHeight: 240 }}>
          <ScrollView style={{ maxHeight: 240 }} nestedScrollEnabled={true}>
            {services.map((service) => (
              <TouchableOpacity
                key={service.id}
                onPress={() => selectService(service)}
                className="px-4 py-3 last:border-b-0 active:bg-gray-50"
              >
                <View className="flex-row justify-between items-center">
                  <Text className=" text-lg font-satoshibold">{service.price} - </Text>
                  <Text className=" text-lg font-satoshibold">{service.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}
