import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { MaterialCommunityIcons , AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../../consts/colors'
import XText from '../../components/XText';
import useOrderProduct from '../../../api/hooks/useOrderProduct';
import { Button } from 'react-native-paper'
import Loading from '../../components/Loading'
import MyModal from '../../components/modals/MyModal';
import ReceiptModal from '../../components/modals/ReceiptModal'
import Header from '../../components/headers/Header';

const OrderProductScreen = ({route, navigation}) => {

  let { orderId } = route.params

  const { orderProducts, getOrderProducts, deleteOrder, loading } = useOrderProduct();
  const [showModal, setShowModal] = useState({confirm: false, qr: false}) 

  useEffect(() => {
    getOrderProducts(orderId)
  }, [])


  return(
    <SafeAreaView style={styles.container}>
      { loading ? <Loading /> : null }

      <Header
        title='Orders'
        onBackPress={() => navigation.pop()}
        rightIcon={() => 
                <TouchableOpacity onPress={() => setShowModal({...showModal, qr:true})}>
                  <MaterialCommunityIcons name="qrcode-scan" size={21} color="white" />
                </TouchableOpacity>
              }
      />

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
                <Image source={{ uri: item.image }} style={styles.imageCart}/>
              </View>
      
              <View style={styles.cardInfo}>      
                  <XText bold style={styles.textProp} numberOfLines={2} >{item.name}</XText>
                  <XText style={styles.textQuant}>{`${item.quantity} PCS x TP ${item.price}`}</XText>
                  <View style={styles.cardTotal}>
                    <XText bold style={styles.orderTotal}>Total: </XText>
                    <XText style={{ color: '#000' }} >{`TP ${item.total_price}`}</XText>
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
                  onPress={ () => setShowModal({...showModal, confirm: true})} >
            <Text style={{ color: '#fff' }}>
                Cancel Order
            </Text>
          </Button>

      </View>
        
        
      <MyModal 
            visible={showModal.confirm}
            onCancelPress={() => setShowModal({...showModal, confirm: false})}
            onConfirmPress={() => {
                deleteOrder(orderId)
                navigation.pop()
                setShowModal({...showModal, confirm: false})
            }}
        >
            <XText style={styles.txtModal}>Are you sure to cancel order <XText bold>{orderProducts.smug_id}</XText>?</XText>
      </MyModal>

      <ReceiptModal
        visible={showModal.qr}
        onBackPress={ () => setShowModal({...showModal, qr: false})}
        order={orderProducts}
      />

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
    backgroundColor: "#E5E8E8",
    borderRadius: 10,
    padding: 10,
    marginVertical: 3,
    marginHorizontal: 15
  },
  cardImage:{
    width: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageCart:{
    width: 60,
    height: 60,
    marginHorizontal: 15
  },
    cardTotal:{
    flexDirection: 'row'
  },
  cardInfo:{
    flex: 1,
    justifyContent: 'center',
  },
  cardText:{
    flex: 1.2,
    flexDirection: "row",
    alignItems: "center",
  },
  textProp:{
    fontSize: 14,
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
  orderTotal:{
    color: COLORS.primary,
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
},
qrBtn:{
  position: 'absolute',
  top: 30,
  right: 10,
  zIndex: 100,
}

});