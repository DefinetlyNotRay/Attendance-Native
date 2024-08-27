import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity,Modal } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sidenav from '../components/Sidenav';
import { BlurView } from 'expo-blur';
import { Calendar, CalendarProps } from 'react-native-calendars';

const HomePage: React.FC = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          router.replace('/index');
        }
      } catch (error) {
        console.error('Failed to get auth token:', error);
      }
    };

    checkAuth();
  }, []);

  const [isSidenavVisible, setSidenavVisible] = useState(false);

  const toggleSidenav = () => {
    setSidenavVisible(!isSidenavVisible);
  };

  const closeSidenav = () => {
    setSidenavVisible(false);
  };

  const onDayPress: CalendarProps['onDayPress'] = (day) => {
    console.log('Selected day:', day);
  };

  return (
    
    <View style={{ flex: 1 }}>
    
      <Header onToggleSidenav={toggleSidenav} />

      {isSidenavVisible && (
        <TouchableOpacity style={styles.blurContainer} activeOpacity={1} onPress={closeSidenav}>
          <BlurView intensity={50} style={StyleSheet.absoluteFill}>
            <View style={styles.overlay} />
          </BlurView>
        </TouchableOpacity>
      )}

      <Sidenav isVisible={isSidenavVisible} onClose={closeSidenav} />

      <View className="flex gap-2 p-5">
        
        <Text className="mb-2 text-xl font-extrabold">Absen Sales</Text>
        <View className="bg-[#FDCE35] flex p-5 rounded-md w-full shadow-lg">
          <View>
            <Text className="font-bold text-white">Senin</Text>
            <Text className="font-bold text-white">8:00 AM - 5:00 PM</Text>
          </View>
          <View>
            <Text className="font-bold text-white">Lokasi:-</Text>
            <Text className="font-bold text-white">Total Waktu Hari Ini:-</Text>
          </View>
        </View>

        <View className="flex flex-row flex-wrap justify-center gap-4">
          <TouchableOpacity className="bg-[#159847] w-[160px] rounded-md py-3 px-1" onPress={() => setModalVisible(true)}>
            
            <Text className="font-bold text-center text-white">Absen Masuk</Text>
          </TouchableOpacity>
          <Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={()=>setModalVisible(!modalVisible)}>
            <View style={styles.modalBackground}>
              <View style={styles.modalView}>
                <Text className='text-md'>Hello, I am a Modal!</Text>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TouchableOpacity className="bg-[#F23737] w-[160px] rounded-md py-3 px-1">
            <Text className="font-bold text-center text-white">Absen Pulang</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#00CABE] w-[160px] rounded-md py-3 px-1">
            <Text className="font-bold text-center text-white">Izin</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="p-5 mx-5 mb-3 bg-white rounded-xl">
        <Text className='text-center text-[16px] font-bold'>Presensi</Text>
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            
            '2024-08-16': { 
              selected: true, 
              selectedColor: '#F2D437', // Pink background
              dotColor: 'red', 
              selectedTextColor: 'white', // Black text
            },
            '2024-08-17': { 
              selected: true, 
              selectedColor: '#159847', // Pink background
              dotColor: 'red', 
              selectedTextColor: 'white', // Black text
            },
            
           
          }}
          theme={{
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#90EE90',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            monthTextColor: 'black',
            indicatorColor: 'black',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 12,
            textMonthFontSize: 12,
            textDayHeaderFontSize: 12,
          }}
        />
      </View>

      <View className='flex flex-row items-center justify-center gap-12'>
        <View className='flex items-center justify-center '>
          <View className='pt-[2px]' style={[styles.legendDot, { backgroundColor: '#159847' }]} >
          <Text className="text-sm text-center text-white">1</Text>

          </View> 
          <Text className="text-sm text-center">Hadir</Text>
        </View>
        <View className='flex items-center justify-center '>
          <View className='pt-[2px]' style={[styles.legendDot, { backgroundColor: '#F2D437' }]} >
          <Text className="text-sm text-center text-white">1</Text>

          </View>
          <Text className="text-sm text-center">Telat</Text>
        </View>
        <View className='flex items-center justify-center '>
          <View className='pt-[2px]' style={[styles.legendDot, { backgroundColor: '#F23737' }]} >
          <Text className="text-sm text-center text-white">1</Text>

          </View>
          <Text className="text-sm text-center">Absen</Text>
        </View>
        <View className='flex items-center justify-center '>
          <View className='pt-[2px]' style={[styles.legendDot, { backgroundColor: '#00CABE' }]} >
          <Text className="text-sm text-center text-white">1</Text>

          </View>
          <Text className="text-sm text-center">Izin</Text>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#F194FF',
    padding: 10,
    borderRadius: 20,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
 

  
  legendDot: {
    width: 25,
    height: 25,
    borderRadius:5,
    
  },
  
});

export default HomePage;
