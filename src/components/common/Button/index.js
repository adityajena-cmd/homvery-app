import React from 'react'
import { Button as RNButton } from 'react-native-paper'
import styles from './button.styles'
const Button = ({ label, onPress = () => { } }) => {
    return (

        <RNButton
            labelStyle={styles.buttonStyle}
            mode="text"
            uppercase={false}
            onPress={onPress}>
            {label}
        </RNButton>
    )
}

export default Button
