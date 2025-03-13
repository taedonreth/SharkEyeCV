import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import RealShark from '../components/RealShark';
import RealSharkLabel from '../components/realSharklabel';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page10() {
  const title = " "; // Or any title
  const description = (
    <View style={styles.container}>
      {/* Main content in a flex container */}
      <View style={styles.mainContent}>
        {/* RealShark + RealSharkLabel side by side (or stacked, your choice) */}
        <View style={styles.sharkSection}>
          <View style={styles.realSharkContainer}>
            <RealShark />
          </View>
          <View style={styles.realSharkLabelContainer}>
            <RealSharkLabel />
          </View>
        </View>
      </View>

      {/* Footer (navigation buttons) pinned to bottom by flex layout */}
      <View style={styles.footerContainer}>
        <Link href="/page9" asChild>
          <BackButton isNavigation={true} />
        </Link>

        <Link href="/page11" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={10} title={title} description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,           // Fills the space inside BasePage
  },
  mainContent: {
    flex: 1,           // Pushes footer to the bottom
    justifyContent: 'center',
    alignItems: 'center',
    // You can add padding if you want space around the content
  },
  sharkSection: {
    flexDirection: 'column',
    alignItems: 'center',
    // Apply scaling to the entire section containing both components
    transform: [{ scale: 0.65 }], // Adjust this value to make them smaller (0.5-0.8 range)
  },
  realSharkContainer: {
    marginRight: 20,   // Space between shark and label
  },
  realSharkLabelContainer: {
    // Additional styling if needed
    marginTop: 10, // Add a bit of space between the shark and label when stacked
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
    backgroundColor: 'transparent', // or any color you like
  },
});