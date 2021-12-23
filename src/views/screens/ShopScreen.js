import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../../consts/colors'
import ItemCards from '../components/lists/ItemCards'
import useProduct from '../../api/hooks/useProduct'
import useProductCartegory from '../../api/hooks/useProductCategory'
import useCart from '../../api/hooks/useCart'
import Loading from '../components/Loading'
import { useToast } from 'react-native-toast-notifications'
import { Searchbar } from 'react-native-paper';
import CategoryTabs from '../components/lists/CategoryTabs'
import ProductDetailsModal from '../components/modals/ProductDetailsModal'


const ShopScreen = () => {
    const { products, getProduct, searchProduct, loading } = useProduct();
    const {productCategories, getProductCategories} = useProductCartegory();
    const {addToCart} = useCart();
    const toast = useToast()

    const [tabIndex, setTabIndex] = useState(0)
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false)
    const [product, setProduct] = useState({})
    
    useEffect(()=>{
        getProductCategories()
        getProduct(productCategories[0].id)
    },[])

    return (
        <SafeAreaView style={styles.container}>

            { loading ? <Loading /> : null }

            <Searchbar
                placeholder="Search"
                onChangeText={setSearch}
                value={search}
                onSubmitEditing={() => {
                    if(search != ''){
                        searchProduct(search)
                        setTabIndex(-1)
                    }
                }}
                onIconPress={() => searchProduct(search)}
            />

            <CategoryTabs
                categories={productCategories}
                onPress={(id, index) => { 
                    getProduct(id)
                    setTabIndex(index)
                }}
                catIndex={tabIndex}
            />


            <ItemCards 
                items={products}
                addToCartOnPress={(product_id) => {
                    addToCart({product_id: product_id, quantity: 1})
                    toast.show('Added to cart',{type: 'success'})
                }}
                cardOnPress={(item) => {
                    setShowModal(true)
                    setProduct(item)
                }}
            />

            <ProductDetailsModal 
                visible={showModal}
                onBackPress={ () => setShowModal(false)}
                product={product}
                onSubmitPress={(id, quantity) => {
                    addToCart({product_id: id, quantity})
                    setShowModal(false)
                }}
            />

        </SafeAreaView>
    )
}

export default ShopScreen
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    headerTitle:{
        textAlign: 'center',
        fontSize: 32,

    },
    searchContainer: {
        marginVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    inputSearch:{
        backgroundColor: COLORS.light,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderRadius: 10,
        flex: 1,
        marginRight: 10,
    },
    searchIcon:{
        marginHorizontal: 10
    },
    filterIcon: {
        height: 50,
        width: 50,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    loading:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 100
    },
    quantityContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    quantityCount: {
        fontSize: 16,
    },
    quantityBtn:{
        borderRadius: 20,
        padding: 5
    },
    quantityController: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
    },
})

