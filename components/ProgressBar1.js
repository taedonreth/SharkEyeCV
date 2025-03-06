import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

const Progressbar1 = ({ percentage = 0 }) => {
  return (
    <View style={styles.container}>
      {/* Percentage text - now positioned to the left of the bar */}
      <Text style={styles.percentageText}>{Math.round(percentage)}%</Text>

      <View style={styles.progressContainer}>
        {/* Background bar */}
        <View style={styles.progressBackground}>
          {/* Filled portion */}
          <View
            style={[
              styles.progressFill,
              { width: `${percentage}%` }
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  percentageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10,
    width: 50,
  },
  progressContainer: {
    flex: 1,
    height: 28,
  },
  progressBackground: {
    height: 28,
    backgroundColor: '#E6EBEA',
    borderRadius: 14,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CC0B9',
    borderRadius: 14,
  }
});

export default Progressbar1;
