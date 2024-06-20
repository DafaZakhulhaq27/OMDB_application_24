import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function DetailMovieScreen() {
  const route = useRoute();
  const { Title, Year, imdbID, Type, Poster } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: Poster }}
        style={{ width: "100%", height: 300 }}
        resizeMode="contain"
      />
      <Text>{imdbID}</Text>
      <Text>{Title}</Text>
      <Text>{Year}</Text>
      <Text>{Type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    gap: 10,
    alignItems: "center",
  },
});
