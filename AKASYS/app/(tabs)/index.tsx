import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";

export default function App() {
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState("");
  const [corpo, setCorpo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEnviar = async () => {
    if (!email || !assunto || !corpo) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    setLoading(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15s

    try {
      // Monta query string para o backend
      const params = new URLSearchParams({ assunto, corpo }).toString();
      const url = `http://192.168.1.3:8000/relatorios/enviar?${params}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const msg = data?.detail || JSON.stringify(data) || `Erro: ${response.status}`;
        throw new Error(msg);
      }

      Alert.alert("Sucesso", data?.msg || "Relatório enviado!");
      setEmail("");
      setAssunto("");
      setCorpo("");
    } catch (err: any) {
      if (err.name === "AbortError") {
        Alert.alert("Erro", "Tempo de envio excedido. Tente novamente.");
      } else if (err.message.includes("Network request failed")) {
        Alert.alert(
          "Erro de conexão",
          "Não foi possível conectar ao servidor. Verifique o IP e se o backend está rodando."
        );
      } else {
        // Converte objetos em string se necessário
        Alert.alert("Erro", typeof err === "object" ? JSON.stringify(err) : err.toString());
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Enviar Relatórios</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o e-mail"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Digite o assunto"
        placeholderTextColor="#888"
        value={assunto}
        onChangeText={setAssunto}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Digite o corpo da mensagem"
        placeholderTextColor="#888"
        value={corpo}
        onChangeText={setCorpo}
        multiline
        numberOfLines={4}
      />

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <Button title="Enviar" color="#1db954" onPress={handleEnviar} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#121212", // fundo escuro
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff", // texto branco
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#333", // borda escura
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#1e1e1e", // fundo dos inputs escuro
    color: "#fff", // texto branco
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },
});
