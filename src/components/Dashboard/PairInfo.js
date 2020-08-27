import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PairInfoContext } from "../../context/PairInfo/PairInfoContext";
import AppButton from "../custom_ui/AppButton";
import { AntDesign } from '@expo/vector-icons';
import AppTextBold from "../custom_ui/AppTextBold";
import AppText from "../custom_ui/AppText";
import Colors from "../../utils/Colors";
import { observer, inject } from "mobx-react";
import { getSnapshot } from 'mobx-state-tree';

const PairInfo = (props, { route, navigation }) => {
  console.log("KKKKKPairInfo", props);
  const { quoteParams } = props.route.params;
  const quoteId = quoteParams.symbol;
  const { quote, fetchQuote } = useContext(PairInfoContext);
  const [quoteData, setQuoteData] = useState(null)

  const loadQuote = useCallback(async () => {
    await fetchQuote(quoteId);
    await props.singleQuote.fetchSingleQuote(quoteId)

  }, [fetchQuote]);

  useEffect(() => {
    loadQuote();
  }, []);
  useEffect(() => {


    setQuoteData(getSnapshot(props.singleQuote.singleQuote)[0])
    console.log("KKKKKPairInfo555", props.singleQuote.singleQuote);
  }, [props]);
  console.log("KKKKKPairInfoEnd", quoteData);
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <AppTextBold style={{ fontSize: 26 }}>Symbol:</AppTextBold>
        <AppText style={{ fontSize: 26 }}>{quoteParams['symbol']}</AppText>
      </View>
      <View style={styles.block}>
        <AppTextBold style={{ fontSize: 26 }}>Description:</AppTextBold>
        <AppText style={{ fontSize: 26 }}>{quoteParams['description']}</AppText>
      </View>
      <View style={styles.block}>
        <AppTextBold style={{ fontSize: 26 }}>Digits:</AppTextBold>
        <AppText style={{ fontSize: 26 }}>{quoteParams['digits']}</AppText>
      </View>
      <View style={styles.block}>
        <AppTextBold style={{ fontSize: 26 }}>Trade:</AppTextBold>
        <AppText style={{ fontSize: 26 }}>{quoteParams['trade']}</AppText>
      </View>
      {quoteData && (
        <View style={styles.data}>
          <View style={styles.block}>
            <AppTextBold style={{ fontSize: 26 }}>Ask:</AppTextBold>
            <AppText style={{ fontSize: 26 }}>{quoteData.ask}</AppText>
          </View>
          <View style={styles.block}>
            <AppTextBold style={{ fontSize: 26 }}>Bid:</AppTextBold>
            <AppText style={{ fontSize: 26 }}>{quoteData.bid}</AppText>
          </View>
          <View style={styles.block}>
            <AppTextBold style={{ fontSize: 26 }}>Change:</AppTextBold>
            <AppText style={{ fontSize: 26 }}>{quoteData.change}</AppText>
          </View>
          <View style={styles.block}>
            <AppTextBold style={{ fontSize: 26 }}>Change 24h:</AppTextBold>
            <AppText style={{ fontSize: 26 }}>{quoteData.change24h}</AppText>
          </View>
        </View>
      )}
      <View style={styles.button}>
        <AppButton color={Colors.greyColor} onPress={() => props.navigation.goBack()}>
          <AntDesign name="back" size={40} />
        </AppButton>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20
  },
  data: {
    width: '100%',
    alignItems: 'center'
  },
  block: {
    width: '95%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  button: {
    marginTop: 50,
    width: 100
  }
});
export default inject("singleQuote")(observer(PairInfo));
// export default PairInfo;