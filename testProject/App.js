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
  TextInput,
} from "react-native";
import useDebounce from "./hooks/debounce";

export default function App() {
  const [search, setSearch] = useState("star");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(search, 500);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`http://www.omdbapi.com/?s=${debouncedSearch}&apikey=33312c01`) // Replace 'your_api_key' with the actual key from OMDb API
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search || []);
      })
      .catch((error) => {
        setError(JSON.stringify(error));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedSearch]);

  const handlePress = (movie) => {
    // Navigate to details page with the selected movie
    alert(`Selected movie: ${movie.Title}`);
  };

  if (error) {
    return <SafeAreaView style={styles.container}>{error}</SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Film Searcher</Text>
      <TextInput
        style={styles.input}
        onChangeText={setSearch}
        placeholder="Search..."
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView horizontal style={styles.scrollView}>
          {movies.map((movie, index) => (
            <TouchableOpacity key={index} onPress={() => handlePress(movie)}>
              <View style={styles.movieContainer}>
                <Text style={styles.movieTitle}>{movie.Title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

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
  loadingContainer: {
    flex: 1,
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 300,
    maxWidth: "100%",
  },
});
