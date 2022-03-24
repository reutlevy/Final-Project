import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../../constants/colors";

const EventItem = (props) => (
  <TouchableOpacity
    style={styles.listItem}
    onPress={() => {
      props.navi.navigate("EventPage", {
        event: props.event,
      });
    }}
  >
    <View>
      <Text style={styles.text}>{props.event.date}</Text>
      <Text style={styles.text}>{props.event.event_name}</Text>
    </View>
    <Text style={styles.text}>{props.event.type}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 6,
    backgroundColor: Colors.button_gray,
    borderRadius: 18,
    height: 60,
    width: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: 0,
    display: "flex",
  },
  text: {
    fontFamily: "alef-regular",
    fontSize: 14,
    textAlign: "left",
  },
});

export default EventItem;
