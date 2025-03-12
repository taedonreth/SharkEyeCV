import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import RealShark from '../components/RealShark';
import Wave from '../components/Wave';
import RealSharkLabel from '../components/realSharklabel';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page10() {
  const title = " "; // Or any title
  const description = (
    <View style={styles.container}>
      
      {/* Wave in the background, anchored at bottom */}
      <View style={styles.waveWrapper}>
        <Wave />
      </View>

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
  waveWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,        // Behind all other elements
    // If you want to shift or scale the wave:
    // transform: [{ scale: 1.2 }, { translateX: -50 }],
  },
  mainContent: {
    flex: 1,           // Pushes footer to the bottom
    justifyContent: 'center',
    alignItems: 'center',
    // You can add padding if you want space around the content
  },
  sharkSection: {
    flexDirection: 'row', 
    alignItems: 'center',
    // If you want them stacked vertically, use flexDirection: 'column'
  },
  realSharkContainer: {
    marginRight: 20,   // Space between shark and label
    // If you want the shark smaller or partially off-screen:
    // transform: [{ scale: 0.8 }, { translateX: -50 }],
  },
  realSharkLabelContainer: {
    // Additional styling if needed
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'transparent', // or any color you like
  },
});
