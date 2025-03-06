import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import { ThemedView } from '../components/ThemedView';

// Import individual page components
import LandingPage from './pages/LandingPage';
import OverviewPage from './pages/OverviewPage';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
import Page6 from './pages/Page6';
import Page7 from './pages/Page7';
import Page8 from './pages/Page8';
import Page9 from './pages/Page9';
import Page10 from './pages/Page10';
import Page11 from './pages/Page11';
import Page12 from './pages/Page12';
import Page13 from './pages/Page13';
import Page14 from './pages/Page14';
import Page15 from './pages/Page15';
import Page16 from './pages/Page16';
import Page17 from './pages/Page17';

export default function GameFlow() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const totalPages = 17;

  const goToNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  // Render the current page content based on index
  const renderPageContent = () => {
    switch (currentPageIndex) {
      case 0:
        return <LandingPage onContinue={goToNextPage} />;
      case 1:
        return <OverviewPage />;
      case 2:
        return <Page3 />;
      case 3:
        return <Page4 />;
      case 4:
        return <Page5 />;
      case 5:
        return <Page6 />;
      case 6:
        return <Page7 />;
      case 7:
        return <Page8 />;
      case 8:
        return <Page9 />;
      case 9:
        return <Page10 />;
      case 10:
        return <Page11 />;
      case 11:
        return <Page12 />;
      case 12:
        return <Page13 />;
      case 13:
        return <Page14 />;
      case 14:
        return <Page15 />;
      case 15:
        return <Page16 />;
      case 16:
        return <Page17 />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.pageContainer}>
          {renderPageContent()}

          {/* Special case for page 1 - Continue button in the middle */}
          {currentPageIndex === 0 ? (
            <View style={styles.centerButtonContainer}>
              <ContinueButton 
                onPress={goToNextPage} 
                style={{ transform: [{ scale: 0.8 }] }}
              />
            </View>
          ) : (
            <View style={styles.navigationContainer}>
              {/* Back button - hidden on first page */}
              {currentPageIndex > 0 && (
                <View style={styles.backButton}>
                  <BackButton 
                    onPress={goToPreviousPage} 
                    isNavigation={true}
                  />
                </View>
              )}

              {/* Continue button - hidden on last page */}
              {currentPageIndex < totalPages - 1 && (
                <View style={styles.continueButton}>
                  <ContinueButton 
                    onPress={goToNextPage} 
                    isNavigation={true}
                  />
                </View>
              )}
            </View>
          )}
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    position: 'relative',
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0, 
    width: '100%',
  },
  centerButtonContainer: {
    position: 'absolute',
    bottom: 150,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    position: 'absolute',
    left: 0,
    bottom: 10,
  },
  continueButton: {
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
});
