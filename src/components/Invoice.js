import React, { useEffect, useState } from 'react';
import { Image, Text, ToastAndroid, View } from 'react-native';
import { Dimensions } from 'react-native';


export const Invoice = ({ quotationList, paid, offer = 0 }) => {
    const width = Dimensions.get('screen').width;
    const [billing, setBilling] = useState(quotationList)
    const [discount, setDiscount] = useState(offer)

    const getTotalBilling = (invoice) => {
        let bill = 0
        invoice && invoice.length > 0 &&
            invoice.forEach(it => {
                bill = bill + it.cost;
            })
        // setTotal(bill)
        if (discount > 0) {
            return bill - ((discount / 100) * bill);
        } else {
            return bill
        }
    }

    const getDsicount = () =>{
        let bill = 0
        quotationList && quotationList.length > 0 &&
            quotationList.forEach(it => {
                bill = bill + it.cost;
            })
        return ((discount / 100) * bill)
    }

    useEffect(() => {
        // console.log("RESPONSE QUOTATIN-+++++--------------", quotationList?.length)

        ToastAndroid.show("hy" + Math.random().toString(), ToastAndroid.SHORT)
        setDiscount(offer)
        setBilling(quotationList)
    }, [quotationList, offer])
    return (
        <View style={{ backgroundColor: '#ffffff', borderRadius: 10, elevation: 3, padding: 20 }}>
            <Text style={{ color: '#000000', fontSize: 14, textAlign: 'center' }}>Payment Details</Text>
            <View style={{ height: 1, backgroundColor: '#EAE2E2', marginTop: 10, marginBottom: 10 }} />

            {billing && billing.length > 0 && billing.map((item, index) => {
                return (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>

                        <View style={{ marginTop: 10, flexDirection: 'row' }}>
                            <Text style={{ color: '#000000', fontSize: 14 }}>{item.name}</Text>
                        </View>

                        <View style={{ marginTop: 10 }}>

                            <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right' }}>{'₹ ' + item.cost.toString()}</Text>
                        </View>
                        {
                            index == 0 && paid ?
                                <Image style={{ marginLeft: width / 3, position: 'absolute', top: -10, width: width / 5, height: width / 5 }} source={require('../assets/paid.png')} />
                                : <></>

                        }
                    </View>)
            })}
            {discount > 0 &&
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>

                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                        <Text style={{ color: '#000000', fontSize: 14 }}>{'Discount'}</Text>
                    </View>

                    <View style={{ marginTop: 10 }}>

                        <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right' }}>{'-₹ ' + (getDsicount()).toString()}</Text>
                    </View>
                </View>

            }
            <View style={{ height: 1, backgroundColor: '#EAE2E2', marginTop: 10 }} />
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#000000', fontSize: 14, fontWeight: '600' }}>Total Payable Amount</Text>
                <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right' }}>{'₹' + getTotalBilling(billing).toString()}</Text>
            </View>
        </View>
    )
}
