import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";

import api from "../../services/api";

import logoImg from "../../assets/logo.png";

import {
  Container,
  Header,
  Text,
  TextBold,
  Title,
  Description,
  IncidentList,
  Incident,
  Prop,
  Value,
  PrimaryButton,
  ButtonText
} from "./styles";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate("Detail", {
      incident
    });
  }

  async function loadIncidents() {
    if (loading) return;

    if (total > 0 && incidents.length === total) return;

    setLoading(true);

    const response = await api.get("incidents", {
      params: { page }
    });

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <Container>
      <Header>
        <Image source={logoImg} />
        <Text>
          Total de <TextBold>{total} casos</TextBold>.
        </Text>
      </Header>

      <Title>Bem-vindo!</Title>
      <Description>Escolha um dos casos abaixo e salve o dia.</Description>

      <IncidentList
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <Incident>
            <Prop>ONG:</Prop>
            <Value>{incident.name}</Value>

            <Prop>CASO:</Prop>
            <Value>{incident.title}</Value>

            <Prop>VALOR</Prop>
            <Value>
              {Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </Value>

            <PrimaryButton onPress={() => navigateToDetail(incident)}>
              <ButtonText>Ver mais detalhes</ButtonText>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </PrimaryButton>
          </Incident>
        )}
      />
    </Container>
  );
}
