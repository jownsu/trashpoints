import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import WeCollectCard from '../home/WeCollectCard'
import config from '../../../api/config'

const TrashCategoryList = ({categories, onPress}) => {
    return (
        <View style={styles.container}>
            <FlatList 
                data={categories}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity onPress={() => onPress(item.id, item.name) }>
                            <WeCollectCard 
                                title={item.name}
                                info={item.description}
                                img={{ uri: item.image }}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
        </View> 
    )
}

export default TrashCategoryList

const styles = StyleSheet.create({
    container:{
        flex: 1
    }
})
