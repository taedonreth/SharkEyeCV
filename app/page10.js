import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import SharkFramingGame from '../components/SharkFramingGame';

import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page10() {
  const description = (
    <View style={styles.container}>
      {/* Main Content: BackDrop, AnswerBox and Shark */}
      <View style={styles.mainContent}>

        {/* Added SharkFramingGame */}
        <View style={styles.gameSection}>
          <SharkFramingGame />
        </View>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Link href="/page9" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page11" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );
  return <BasePage pageNumber={10} title=" " description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameSection: {
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});