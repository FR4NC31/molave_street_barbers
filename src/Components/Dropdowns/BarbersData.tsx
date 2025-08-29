import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface Barber {
  id: number
  name: string
}

const barbers: Barber[] = [
  { id: 1, name: 'John Doe - Barber' },
  { id: 2, name: 'Jane Smith - Barber' },
  { id: 3, name: 'Mike Johnson - Barber' },
  { id: 4, name: 'Sarah Wilson - Barber' },
  { id: 5, name: 'David Brown - Barber' }
]

export default function BarbersData() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const selectBarber = (barber: Barber) => {
    setSelectedBarber(barber)
    setIsDropdownOpen(false)
  }

  return (
    <View className="relative w-full max-w-md">
      {/* Dropdown Trigger */}
      <TouchableOpacity
        onPress={toggleDropdown}
        className="flex-row items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm"
      >
        <Text className=" font-satoshibold text-lg">
          {selectedBarber ? selectedBarber.name : 'Select your barber'}
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
        <View className="absolute top-12 left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-86 overflow-y-auto">
          {barbers.map((barber) => (
            <TouchableOpacity
              key={barber.id}
              onPress={() => selectBarber(barber)}
              className="px-4 py-3 last:border-b-0 active:bg-gray-50"
            >
              <Text className="text-gray-800 text-lg font-satoshibold">{barber.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}
