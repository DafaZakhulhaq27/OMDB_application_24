import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://www.omdbapi.com/?s=star&apikey=33312c01") // Replace 'your_api_key' with the actual key from OMDb API
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, "err");
        setLoading(false);
      });
  }, []);

  const handlePress = (movie) => {
    // Navigate to details page with the selected movie
    alert(`Selected movie: ${movie.Title}`);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Film Searcher</Text>
      <ScrollView horizontal style={styles.scrollView}>
        {movies.map((movie, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(movie)}>
            <View style={styles.movieContainer}>
              <Text style={styles.movieTitle}>{movie.Title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scrollView: {
    width: "100%",
    height: 200,
  },
  movieContainer: {
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
