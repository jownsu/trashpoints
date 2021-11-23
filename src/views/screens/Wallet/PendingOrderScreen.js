import React, {useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import COLORS from '../../../consts/colors';
import useOrder from '../../../api/hooks/useOrder';
import Loading from '../../components/Loading'

const PendingOrderScreen = ({navigation}) => {

  const { orders, getOrders, loading } = useOrder()

  useEffect(() => {
    getOrders()

    const listener = navigation.addListener('focus', () => {
      getOrders()
    })

    return listener
    
  }, [])

  return(
    <SafeAreaView style={styles.container}>

      { loading ? <Loading /> : null }

      <View style={styles.headerCollector}>
        <TouchableOpacity style={styles.backIcon} onPress={() => {navigation.pop()}}>
          <AntDesign name="back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Pending List</Text>
      </View>

      <FlatList 
            data={orders}
            keyExtractor={orders => orders.id.toString()}
            renderItem={({item}) => {
              return (
                <TouchableOpacity style={styles.cardContainer} onPress={() => {navigation.navigate('OrderProductScreen', {orderId: item.id})}}>
                    <View style={styles.card1}>
                        <Text style={styles.cardTextDate}>{item.checked_out_at}</Text>
                        <Text style={styles.cardTextID}>Order ID : {item.id}</Text>
                    </View>
                    
                    <View style={styles.card2}>
                        <Text style={styles.cardTextTotal} numberOfLines={1}>Total : TP { item.total_price }</Text>
                        <View style={styles.ioniconArrow}>
                            <Ionicons name="chevron-forward-outline" size={25} color="green"/>
                        </View>
                    </View>  
                </TouchableOpacity>
                
              )
            }}
          />

    </SafeAreaView>
  );
}

export default PendingOrderScreen

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  headerCollector:{
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: COLORS.primary,
    flexDirection: 'row'
    },
  headerText:{
    textAlign: "center",
    color: "#ffffff",
    fontSize: 20,
  },
  backIcon:{
    position: 'absolute',
    left: 20
  },
  cardContainer:{
    flexDirection: "row",
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
  },
  card1:{
    flex: 1,
    flexDirection: "column"
  },
  card2:{
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  cardTextID:{
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 10,
  },
  cardTextDate:{
    fontSize: 12,
    margin: 10,
  },
  cardTextTotal:{
    fontSize: 15,
    margin: 10,
    color: COLORS.primary,
    width: 130
  },
  ioniconArrow:{
    position: "absolute",
    right: 0,
  },
})