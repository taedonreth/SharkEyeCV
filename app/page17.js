import React from 'react';
import { View, StyleSheet, Image, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';

const VideoComponent = () => {
  if (Platform.OS === 'web') {
    return (
      <iframe
        src="https://sharkeye.org?wvideo=ajmwpt0hu3"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        allow="autoplay; fullscreen"
      />
    );
  }

  return (
    <WebView
      source={{ uri: 'https://sharkeye.org?wvideo=ajmwpt0hu3' }}
      style={styles.video}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowsFullscreenVideo={true}
    />
  );
};

export default function Page17() {
  const title = ' ';
  const description = (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.contentRow}>
          {/* Left side container for Shark and Speech Bubble */}
          <View style={styles.leftContainer}>
            {/* Speech bubble positioned above the shark */}
            <View style={styles.speechBubbleContainer}>
              <Image
                source={require('../assets/images/page17bubble.png')}
                style={styles.speechBubbleImage}
                resizeMode="contain"
              />
            </View>
            {/* Shark below the speech bubble */}
            <View style={styles.sharkContainer}>
              <Shark />
            </View>
          </View>

          {/* Right side container for Video */}
          <View style={styles.rightContainer}>
            <View style={styles.videoContainer}>
              <VideoComponent />
            </View>
          </View>
        </View>
      </View>

      {/* Footer with Back button only */}
      <View style={styles.footerContainer}>
        <Link href="/page16" asChild>
          <BackButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={17} title={title} description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 10,
    position: 'relative',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    marginRight: -100,
  },
  speechBubbleContainer: {
    position: 'absolute',
    left: 130,
    bottom: 300,
    zIndex: 2,
    width: 400,
    transform: [{ scale: 0.8 }],
  },
  speechBubbleImage: {
    width: '100%',
    height: 400,
  },
  sharkContainer: {
    marginTop: 200,
    zIndex: 1,
    marginLeft: -140,
  },
  videoContainer: {
    width: 600,
    height: 500,
    backgroundColor: '#E6EBEA',
    borderRadius: 30,
    overflow: 'hidden',
  },
  video: {
    flex: 1,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 25,
  },
});
