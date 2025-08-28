import React, { useState, useEffect, useRef } from "react";
import { View, Image, Dimensions, Animated, FlatList, NativeSyntheticEvent, NativeScrollEvent, Text } from "react-native";

const { width } = Dimensions.get("window");

interface CarouselProps {
  images: any[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  style?: any; // Added style prop for z-index and other styling
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoPlay = true,
  autoPlayInterval = 3000,
  style,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    if (autoPlay && images && images.length > 1) {
      const interval = setInterval(() => {
        if (flatListRef.current) {
          const nextIndex = (currentIndex + 1) % images.length;
          setCurrentIndex(nextIndex);
          flatListRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
        }
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [currentIndex, autoPlay, autoPlayInterval, images]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }: { item: any; index: number }) => {
    return (
      <View
        className="w-full justify-center items-center"
        style={{ width, aspectRatio: 3/4 }} // Changed to aspect ratio for better portrait support
      >
        <Image
          source={item}
          className="w-[90%] h-[75%] top-16 rounded-3xl"
          resizeMode="cover"
        />
      </View>
    );
  };

  const renderDotIndicators = () => {
    if (!images || images.length <= 1) return null;
    
    return (
      <View className="flex-row justify-center items-center">
        {images.map((_, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={{ opacity }}
              className={`${index === currentIndex ? "w-6 h-2" : "w-2 h-2"} rounded-full mx-1 ${
                index === currentIndex ? "bg-black" : "bg-gray-500"
              }`}
            />
          );
        })}
      </View>
    );
  };

  const renderPageIndicator = () => {
    if (!images || images.length <= 1) return null;
    
    return (
      <View className="absolute top-44 right-14 bg-black/70 px-3 py-1 rounded-lg z-10">
        <Text className="text-white text-sm font-medium">
          {currentIndex + 1}/{images.length}
        </Text>
      </View>
    );
  };

  return (
    <View className="w-full" style={style}>
      {/* Page indicator in top right corner */}
      {renderPageIndicator()}
      
      <Animated.FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={32} // Increased for smoother animation
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
      {renderDotIndicators()}
    </View>
  );
};

export default Carousel;
