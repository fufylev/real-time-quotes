import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View, YellowBox } from 'react-native';
import io from "socket.io-client";
import { RealTimeQuotesContext } from "../../context/Quotes/RealTimeQuotesContext";
import QuoteView from "./QuoteView";
import { observer, inject } from "mobx-react";

const Quotes = (props) => {
  const { quotes } = props;
  console.log("quotes", quotes);


  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - 20);

  YellowBox.ignoreWarnings(['Remote debugger']);

  useEffect(() => {
    let socket;

    try {
      socket = io('https://qrtm1.ifxid.com:8443', {
        forceNew: true,
      });
    } catch (e) {

    }

    socket.on('connect', () => {
      socket.emit('subscribe', ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'USDCAD', 'AUDUSD', 'GOLD',
        'AUDCAD', 'GBPCHF', 'GBPCAD', 'USDRUR', 'NZDDKK', 'AUDHKD'])
    });

    socket.on('quotes', (data) => {
    });

    YellowBox.ignoreWarnings([
      'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
    ]);

    return () => {
      socket.on('connect', () => {
        socket.emit('unsubscribe', ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'USDCAD', 'AUDUSD', 'GOLD',
          'AUDCAD', 'GBPCHF', 'GBPCAD', 'USDRUR', 'NZDDKK', 'AUDHKD'])
      })
    }
  }, []);

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get('window').width - 20;
      setDeviceWidth(width);
    };

    Dimensions.addEventListener('change', update);

    return () => {
      Dimensions.removeEventListener('change', update);
    };
  });

  return (

    <View style={styles.container}>
      <View style={styles.tableName}>
        <Text style={{ ...styles.common, ...styles.bold, width: deviceWidth * 0.24 - 10, textAlign: 'left' }}> Pair </Text>
        <Text style={{ ...styles.common, ...styles.bold, width: deviceWidth * 0.25 - 10 }}> Bid </Text>
        <Text style={{ ...styles.common, ...styles.bold, width: deviceWidth * 0.25 - 10 }}> Change </Text>
        <Text style={{ ...styles.common, ...styles.bold, width: deviceWidth * 0.21 - 10 }}> % </Text>
        <Text style={{ width: deviceWidth * 0.03 }} />
      </View>
      <ScrollView>
        {quotes.quotesList.length !== 0
          ? quotes.quotesList.map((e, i) => (
            <QuoteView key={i} currency={e} deviceWidth={deviceWidth} />
          ))
          : null}
      </ScrollView>
    </View>
  )
};

Quotes.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    fontSize: 22
  },
  tableName: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  common: {
    marginRight: 10,
    textAlign: 'center',
    fontSize: 15
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 16
  },
  arrows: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default inject("quotes")(observer(Quotes));
// export default Quotes;