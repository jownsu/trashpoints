import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { MaterialCommunityIcons , AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../../consts/colors'
import XText from '../../components/XText';
import useOrderProduct from '../../../api/hooks/useOrderProduct';
import config from '../../../api/config';
import { Button } from 'react-native-paper'
import Loading from '../../components/Loading'
import MyModal from '../../components/MyModal'

const OrderProductScreen = ({route, navigation}) => {

  let { orderId } = route.params

  const { orderProducts, getOrderProducts, deleteOrder, loading } = useOrderProduct();
  const [showModal, setShowModal] = useState(false) 

  useEffect(() => {
    getOrderProducts(orderId)
  }, [])


  return(
    <SafeAreaView style={styles.container}>
      { loading ? <Loading /> : null }
    
      <View style={styles.headerCollector}>
        <TouchableOpacity onPress={() => {navigation.pop()}}>
          <AntDesign name="back" size={24} color="white" />
        </TouchableOpacity>
        <XText style={styles.headerCart}>Orders</XText>
        <TouchableOpacity onPress={() => navigation.navigate('ReceiptScreen', {order: orderProducts})}>
          <MaterialCommunityIcons name="qrcode-scan" size={21} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.headerIDCont}>
        <XText style={styles.headerID}>ID: {orderProducts.smug_id}</XText>
        <XText style={{position: "absolute", right: 20, fontSize: 20}}>{orderProducts.checked_out_at}</XText>
      </View>
      
      <FlatList 
        data={orderProducts.products}
        keyExtractor={orderProducts => orderProducts.id.toString()}
        renderItem={({item}) => {
          return(
            <View style={styles.cardContainer}>

              <View style={styles.cardImage}>
                <Image source={{ uri: config.imgPath + "/" + item.image }} style={styles.imageCart}/>
                <View>
                  <XText bold style={styles.textProp} numberOfLines={1}>{item.name}</XText>
                  <XText style={styles.textQuant}>{`${item.quantity} PCS x TP ${item.price}`}</XText>
                </View>
              </View>
      
              <View style={styles.cardText}>      
                <View style={styles.totalPos}>
                  <XText>Total </XText>
                  <XText bold style={styles.orderTotal} numberOfLines={1} >{`TP ${item.total_price}`}</XText>
                </View>
              </View>
          </View>
          )
        }}
      />

      <View style={styles.checkoutContainer}>
          <View style={styles.totalContainer}>
              <XText style={styles.totalPrice} bold>Total Price</XText>
              <XText style={styles.price} bold numberOfLines={1}>TP {orderProducts.total_price}</XText>
          </View>

          <Button mode="contained" color={COLORS.red} 
                  onPress={ () => setShowModal(true)} >
            <Text style={{ color: '#fff' }}>
                Cancel Order
            </Text>
          </Button>

      </View>
        
        
      <MyModal 
            visible={showModal}
            onCancelPress={() => setShowModal(false)}
            onConfirmPress={() => {
                deleteOrder(orderId)
                navigation.pop()
                setShowModal(false)
            }}
        >
            <XText style={styles.txtModal}>Are you sure to cancel order <XText bold>{orderProducts.smug_id}</XText>?</XText>
        </MyModal>

    </SafeAreaView>

  )
};

export default OrderProductScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  headerCollector:{
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20
    },
  headerCart:{
    textAlign: "center",
    color: "#ffffff",
    fontSize: 20,
  },
  cardContainer:{
    flexDirection: "row",
    height: 75,
    backgroundColor: "#E5E8E8",
    borderRadius: 10,
    marginVertical: 3,
    marginHorizontal: 15
  },
  cardImage:{
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageCart:{
    width: 60,
    height: 60,
    marginHorizontal: 15
  },
  cardText:{
    flex: 1.2,
    flexDirection: "row",
    alignItems: "center",
  },
  textProp:{
    fontSize: 16,
  },
  textQuant:{
    color: "green"
  },
  headerIDCont:{
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 20,
  },
  headerID:{
    fontSize: 20,
  },
  delCart:{
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "red",
    bottom: 0,
  },
  totalPos:{

  },
  orderTotal:{
    color: COLORS.primary,
    width: 120,
  },
  totalText:{
    fontSize: 16
  },
  mainTot:{
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#E5E8E8",
    bottom: 50,
  },
  checkoutContainer: {
    borderTopWidth: 1,
    borderColor: COLORS.grey,
    paddingBottom: 30,
    paddingTop: 10,
    justifyContent: "space-around",
    alignItems: 'center'
},
totalContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '80%',
  marginBottom: 10,

},
totalPrice: {
  fontSize: 18,
},
price: {
  fontSize: 24,
  maxWidth: 130,
},
btn: {
  marginVertical: 10,
  width: 250
},
txtModal:{
  paddingVertical: 30,
  paddingHorizontal: 10
}

});