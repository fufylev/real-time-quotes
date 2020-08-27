import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import AppTextBold from '../custom_ui/AppTextBold'
import Colors from "../../utils/Colors";

const Quote = ({ quote, onOpen }) => {
  return (
    <TouchableOpacity onPress={() => {
      console.log("KKKKK666", quote);

      onOpen(quote)
    }}>
      <View style={styles.quote}>
        <AppTextBold style={{ fontSize: 26 }}>{quote.symbol}</AppTextBold>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  quote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.greyColor,
    borderRadius: 5,
    marginBottom: 10,
    flex: 1
  }
})

Quote.propTypes = {
  quote: PropTypes.object,
  onOpen: PropTypes.func,
  init: PropTypes.func
}

export default Quote
