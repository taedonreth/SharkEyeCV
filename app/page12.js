import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import MurkySharkFramingGame from '../components/MurkySharkFramingGame';

import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page12() {
  const description = (
    <View style={styles.container}>
      {/* Main Content: BackDrop, AnswerBox and Shark */}
      <View style={styles.mainContent}>
        <View style={styles.sharkSection}>
          <Shark />
        </View>
        
        {/* Added SharkFramingGame */}
        <View style={styles.gameSection}>
          <MurkySharkFramingGame />
        </View>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Link href="/page11" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page13" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );
  return <BasePage pageNumber={12} title=" " description={description} />;
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
  sharkSection: {
    marginTop: 0,
    left:-400,
  },
  gameSection: {
    marginTop: -500,
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});