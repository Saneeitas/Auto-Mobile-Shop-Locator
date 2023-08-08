import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation } from 'react-native';
import colors from '../config/colors';

const FAQ = () => {
  const faqData = [
    {
      question: 'What services do automobile repair shops offer?',
      answer: 'Automobile repair shops offer a range of services, including oil changes, brake repairs, engine diagnostics, tire rotations, and more.'
    },
    {
      question: 'How do I find the nearest automobile repair shop?',
      answer: 'You can use our app to locate the nearest automobile repair shop based on your current location. Just open the app and it will show you the options nearby.'
    },
    {
      question: 'Are there specialized repair shops for specific car brands?',
      answer: 'Yes, some repair shops specialize in specific car brands or types of repairs. Our app can help you find such specialized shops if needed.'
    },
    {
      question: 'How can I get a cost estimate for a repair?',
      answer: 'You can contact the repair shop directly or visit their website to get a cost estimate for a specific repair job.'
    },
    {
      question: 'Do I need an appointment for repairs?',
      answer: 'No just use the app and locate a shop, and walk-ins for your repairs'
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.faq}>Frequently Ask Questions</Text>
      {faqData.map((faq, index) => (
        <TouchableOpacity
          key={index}
          style={styles.faqItem}
          onPress={() => toggleExpand(index)}
        >
          <Text style={styles.question}>{faq.question}</Text>
          {expandedIndex === index && (
            <Text style={styles.answer}>{faq.answer}</Text>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.primary
  },
  faqItem: {
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
  },
  faq:{
    textAlign: "center",
    fontSize: 20,
    marginBottom: 8,
    color:colors.secondary
  },
  question: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
    color:colors.secondary
  },
  answer: {
    fontSize: 14,
    marginTop: 8,
  },
});

export default FAQ;
