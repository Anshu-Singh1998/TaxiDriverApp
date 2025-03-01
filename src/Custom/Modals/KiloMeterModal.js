import React, { useState } from "react";
import { View, Modal, Text, TouchableOpacity, StyleSheet } from "react-native";
import { OTPInput } from "react-native-otp-entry"; // Named import

const KiloMeterModal = ({ visible, onClose, onVerify }) => {
  const [otp, setOtp] = useState("");

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Enter OTP</Text>

          <OTPInput
            numberOfDigits={4}
            onChangeText={setOtp}
            style={styles.otpInput}
            keyboardType="number-pad"
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: otp.length === 4 ? "#007AFF" : "#ccc" }]}
            disabled={otp.length !== 4}
            onPress={() => onVerify(otp)}
          >
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  otpInput: {
    marginBottom: 20,
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelText: {
    marginTop: 15,
    color: "#007AFF",
  },
});

export default KiloMeterModal;
