import React from 'react'
import styles from './input.styles'
import {  Text, TextInput } from 'react-native'

const Input = ({
    secureTextEntry = false,
    label,
    value,
    onChange,
    placeholder,
    disabled,
    numberOnly,
    maxLength = 40,
    style,
    editable = true,
    keyboardType,
    onFocus,
    onBlur,
    multiline = false,
    numberOfLines = 1
  
  
  }) => {
    return (
        <>
        <TextInput
        secureTextEntry={secureTextEntry}
        style={[styles.input, style]}
        label={label}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        maxLength={maxLength}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        onFocus={() => {
          onFocus && onFocus();
        }}
        onBlur={() => {
          onBlur();
        }}
        onChangeText={txt => {
            const t = numberOnly ? text.replace(/[^0-9]/g, '') : txt;
            onChange && onChange(t);
           
          }}
        />
        </>
    )
}

export default Input
