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
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import { getApiBaseUrl } from "@/config/api";

export default function App() {
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState("");
  const [corpo, setCorpo] = useState("");
  const [loading, setLoading] = useState(false);

  // Upload state
  const [uploadTipo, setUploadTipo] = useState<"vendas" | "estoque">("vendas");
  const [pickedFile, setPickedFile] = useState<{
    uri: string;
    name: string;
    mimeType?: string | null;
    size?: number | null;
  } | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const BASE_URL = getApiBaseUrl();

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
      const url = `${BASE_URL}/relatorios/enviar?${params}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const rawText = await response.text();
      let data: any = null;
      try { data = rawText ? JSON.parse(rawText) : null; } catch {}

      if (!response.ok) {
        const msg = data?.detail || (data && Object.keys(data).length ? JSON.stringify(data) : rawText || "(sem corpo)") || `Erro: ${response.status}`;
        throw new Error(msg);
      }

      Alert.alert("Sucesso", data?.msg || rawText || "Relatório enviado!");
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

  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: false,
        copyToCacheDirectory: true,
        type: "*/*",
      });

      if (result.canceled) return;

      const file = result.assets?.[0];
      if (!file) return;

      setPickedFile({
        uri: file.uri,
        name: file.name ?? "upload.csv",
        mimeType: (file as any).mimeType ?? (file as any).mimeType ?? undefined,
        size: file.size ?? undefined,
      });
    } catch (err: any) {
      Alert.alert("Erro", "Falha ao selecionar arquivo");
    }
  };

  const handleUpload = async () => {
    if (!pickedFile) {
      Alert.alert("Atenção", "Selecione um arquivo primeiro.");
      return;
    }

    setUploadLoading(true);

    try {
      const url = `${BASE_URL}/upload/${uploadTipo}`;

      const result = await FileSystem.uploadAsync(url, pickedFile.uri, {
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "file",
        mimeType: pickedFile.name?.toLowerCase().endsWith(".csv") ? "text/csv" : pickedFile.mimeType || "application/octet-stream",
      });

      const rawText = result.body || "";
      let data: any = null;
      try { data = rawText ? JSON.parse(rawText) : null; } catch {}
      if (result.status < 200 || result.status >= 300) {
        const msg = data?.detail || (data && Object.keys(data).length ? JSON.stringify(data) : rawText || "(sem corpo)") || `Erro: ${result.status}`;
        throw new Error(msg);
      }

      Alert.alert("Sucesso", data?.msg || rawText || "Upload realizado e banco populado!");
      setPickedFile(null);
    } catch (err: any) {
      if (err.message?.includes("Network request failed")) {
        Alert.alert(
          "Erro de conexão",
          "Não foi possível conectar ao servidor. Verifique o IP e se o backend está rodando."
        );
      } else {
        Alert.alert("Erro", typeof err === "object" ? JSON.stringify(err) : err.toString());
      }
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Popular Banco de Dados</Text>

      <View style={styles.row}>
        <View style={styles.rowItem}>
          <Button
            title={`Tipo: ${uploadTipo === "vendas" ? "Vendas" : "Estoque"}`}
            color="#1db954"
            onPress={() =>
              setUploadTipo((prev) => (prev === "vendas" ? "estoque" : "vendas"))
            }
          />
        </View>
        <View style={styles.rowItem}>
          <Button title="Escolher arquivo" color="#1db954" onPress={handlePickFile} />
        </View>
      </View>

      {pickedFile ? (
        <Text style={styles.fileLabel}>Selecionado: {pickedFile.name}</Text>
      ) : (
        <Text style={styles.fileLabel}>Nenhum arquivo selecionado</Text>
      )}

      <View style={styles.buttonContainer}>
        {uploadLoading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <Button title="Fazer upload" color="#1db954" onPress={handleUpload} />
        )}
      </View>

      <Text style={[styles.title, { marginTop: 30 }]}>Enviar Relatórios</Text>

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
  fileLabel: {
    width: "100%",
    color: "#ccc",
    marginBottom: 10,
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
  row: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  rowItem: {
    flex: 1,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },
});
