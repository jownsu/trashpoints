import React, { useState } from 'react';
import { View, useWindowDimensions, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

import { Ionicons } from '@expo/vector-icons';

import COLORS from '../../consts/colors';

import XText from './XText';


const FirstRoute = ({data, onCardPress}) => (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View styles={styles.redeemCardContainer}>
            <FlatList 
                data={data}
                keyExtractor={transactions  => transactions.id.toString()}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity style={styles.redeemcard} onPress={() => onCardPress(item.id)}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../../assets/tp.png')} style={styles.redeemImg} />
                                <View>
                                    <XText>{item.transtracted_at}</XText>
                                    <XText>Total Item: {item.total_item}</XText>
                                    <XText>Total Price: {item.total_price}</XText>
                                </View>
                            </View>
                            <View style={ styles.redeemIcon }>
                                <Ionicons name="chevron-forward-outline" size={28} color="green"/>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            
            />
        </View>
    </View>
);

const SecondRoute = ({data, onCardPress}) => (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View styles={styles.redeemCardContainer}>
            <FlatList 
                data={data}
                keyExtractor={recycled  => recycled.id.toString()}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity style={styles.redeemcard} onPress={() => onCardPress(item.id)}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../../assets/tp.png')} style={styles.redeemImg} />
                                <View>
                                    <XText>{item.collected_at}</XText>
                                    <XText>Total Item: {item.total_item}</XText>
                                    <XText>Total Price: {item.total_points}</XText>
                                </View>
                            </View>
                            <View style={ styles.redeemIcon }>
                                <Ionicons name="chevron-forward-outline" size={28} color="green"/>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            
            />
        </View>
    </View>
);

const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: COLORS.primary }}
      style={{ backgroundColor: 'white', color: 'black' }}
      inactiveColor={'black'}
      activeColor={COLORS.primary}
    />
  );



export default function WalletTabView({redeems, onRedeemCardPress, recycled, onRecycledCardPress }) {
  const layout = useWindowDimensions();

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute data={redeems} onCardPress={onRedeemCardPress} />;
      case 'second':
        return <SecondRoute data={recycled} onCardPress={onRecycledCardPress}/>;
      default:
        return null;
    }
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Redeem History' },
    { key: 'second', title: 'Recycled History' },
  ]);

  

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

const styles = StyleSheet.create({
    redeemContainer:{
        flex: 1,
       // top: -25,
       marginTop: 50,
    },
    redeemCardContainer:{
    },
    redeemcard:{
        backgroundColor: COLORS.white,
        height: 75,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.light,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    redeemImg:{
        height: 50,
        width: 50,
        marginRight: 15
    },
    
})

