import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BasePage from './BasePage';
import SharkIcon from '../components/SharkIcon';
import CorrectButton from '../components/CorrectButton';
import FalseButton from '../components/FalseButton';
import Wave from '../components/Wave';
import CroppingRectangle from '../components/CroppingRectangle';
import Shark from '../components/Shark';
import SpeechBubble from '../components/SpeechBubble';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page9() {
  const title = " ";
  const description = (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {/* Box Section with Good and Bad Boxes */}
        <View style={styles.boxSection}>
          {/* Good Box */}
          <View style={styles.box}>
            <View style={styles.iconContainer}>
              <SharkIcon />
              <View style={styles.correctButton}>
                <CorrectButton />
              </View>
            </View>
            <View style={styles.boxLabel}>
              <Text style={styles.labelText}>Good box!</Text>
            </View>
          </View>

          {/* Bad Box */}
          <View style={styles.box}>
            <View style={styles.iconContainer}>
              <SharkIcon />
              <View style={styles.falseButton}>
                <FalseButton />
              </View>
            </View>
            <View style={styles.boxLabel}>
              <Text style={styles.labelText}>Bad box.</Text>
            </View>
          </View>
        </View>

        {/* Cropping Rectangles */}
        <View style={styles.croppingRow}>
          <View style={styles.croppingGood}>
            <CroppingRectangle />
          </View>
          <View style={styles.croppingBad}>
            <CroppingRectangle />
          </View>
        </View>

        {/* Shark Component */}
        <View style={styles.sharkSection}>
          <Shark />
        </View>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Link href="/page8" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page10" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={9} title=" " description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
  },
  boxSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  box: {
    alignItems: 'center',
    width: '45%',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 10,
    height: 130,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  correctButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: [{ scale: 0.8 }],
  },
  falseButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: [{ scale: 0.8 }],
  },
  boxLabel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    width: '100%',
  },
  labelText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  croppingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  croppingGood: {
    transform: [{ scale: 0.65 }],
  },
  croppingBad: {
    transform: [{ scale: 0.65 }],
  },
  sharkSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});
