import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../../consts/colors';
import XText from '../../components/XText';
import config from '../../../api/config';
import { Button } from 'react-native-paper'
import Loading from '../../components/Loading'
import Header from '../../components/Header';
import useRecycled from '../../../api/hooks/useRecycled';

const RecycledProductScreen = ({route, navigation}) => {

  let { recycledId } = route.params

  const { recycled, getRecycledById, loading } = useRecycled();


  useEffect(() => {
    getRecycledById(recycledId)
  }, [])


  return(
    <SafeAreaView style={styles.container}>
      { loading ? <Loading /> : null }
    
      <Header 
          title={"Recycled"}
          onBackPress={() => navigation.pop()}
      />

      <View style={styles.headerIDCont}>
        <XText style={styles.headerID}>ID: {recycled.smug_id}</XText>
        <XText style={{position: "absolute", right: 20, fontSize: 20}}>{recycled.collected_at}</XText>
      </View>
      
      <FlatList 
        data={recycled.products}
        keyExtractor={orderProducts => orderProducts.id.toString()}
        renderItem={({item}) => {
          return(
            <View style={styles.cardContainer}>

              <View style={styles.cardImage}>
                <Image source={{ uri: config.imgPath + "/" + item.image }} style={styles.imageCart}/>
                <View>
                  <XText bold style={styles.textProp} numberOfLines={1}>{item.name}</XText>
                  <XText style={styles.textQuant}>{`${item.quantity} PCS x TP ${item.points}`}</XText>
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
              <XText style={styles.price} bold numberOfLines={1}>TP {recycled.total}</XText>
          </View>

          {/* <Button mode="contained" color={COLORS.red} 
                  onPress={ () => { 
                    deleteOrder(orderId)
                    navigation.pop()
                  }} >
            <Text style={{ color: '#fff' }}>
                Cancel Order
            </Text>
          </Button> */}

      </View>
        
    </SafeAreaView>

  )
};

export default RecycledProductScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
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
});