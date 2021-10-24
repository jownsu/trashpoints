import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import TrashCategoryList from '../../components/trashCategories/TrashCategoryList'
import CategoryList from '../../components/CategoryList'
import TrashItem from '../../components/trashCategories/TrashItem'

import trashCategories from '../../../consts/trashCategories'
import plastic from '../../../consts/trash/plastic'
import metal from '../../../consts/trash/metal'
import paper from '../../../consts/trash/paper'
import organic from '../../../consts/trash/organic'
import glass from '../../../consts/trash/glass'
import clothing from '../../../consts/trash/cloathing'
// import prohibited from '../../../consts/trash/prohibited'
// import toxic from '../../../consts/trash/toxic'

const TrashCategoryScreen = () => {
    const [index, setIndex] = useState(1)
    const [item, setItem] = useState([]);

    useEffect(() => {
        setItem(plastic)
    }, [])

    return (
        <View>
            <TrashCategoryList
                categories={trashCategories}
                currentIndex={index}
                onPress={(id, name) => {
                    setIndex(id)
                    switch (name) {
                        case 'Plastic':
                            setItem(plastic)
                            break;
                        case 'Paper':
                            setItem(paper)
                            break;
                        case 'Organic':
                            setItem(organic)
                            break;
                        case 'Clothing':
                            setItem(clothing)
                            break;
                        case 'Metal':
                            setItem(metal)
                            break;
                        case 'Glass':
                            setItem(glass)
                            break;
                        default:
                            setItem(plastic)
                    }
                }}
            />

            <TrashItem
                items={item}
            />


        </View>
    )
}

export default TrashCategoryScreen

const styles = StyleSheet.create({})
