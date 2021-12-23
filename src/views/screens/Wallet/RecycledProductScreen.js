import React, { useEffect } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../../consts/colors';
import XText from '../../components/XText';
import Loading from '../../components/Loading'
import Header from '../../components/headers/Header';
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
                    <Image source={ { uri: item.image } } style={styles.imageCart}/>
                </View>
                <View style={styles.cardInfo}>      
                    <XText bold style={styles.textProp} numberOfLines={2}>{item.name}</XText>
                    <XText style={styles.textQuant}>{`${item.quantity} PCS x TP ${item.points }`}</XText>
                    <View style={styles.cardTotal}>
                        <XText bold style={styles.orderTotal}>Total </XText>
                        <XText style={{ color: '#000' }} numberOfLines={1} >{`TP ${item.total_price}`}</XText>
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
  cardText:{
    flex: 1.2,
    flexDirection: "row",
    alignItems: "center",
  },
  textProp:{
    fontSize: 14,
  },
  cardInfo:{
    flex: 1,
    justifyContent: 'center',
  },
  cardTotal:{
    flexDirection: 'row'
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