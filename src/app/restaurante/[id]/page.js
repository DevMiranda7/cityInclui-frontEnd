"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PerfilRestaurante from "../../components/restaurantePerfil/restaurantePerfil";
import { getRestauranteById } from "@/src/lib/api/ownerService";
import LoadingScreen from "../../components/loading/LoadingScreen";
export default function RestaurantePage() {
  const params = useParams();
  const restauranteId = params.id;

  const [restaurante, setRestaurante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurante = async () => {
      try {
        const data = await getRestauranteById(restauranteId);
        setRestaurante(data);
      } catch (err) {
        setError("Não foi possível carregar o restaurante.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurante();
  }, [restauranteId]);

  if (loading) return <LoadingScreen text="Carregando restaurante..." />;
  if (error) return <p>{error}</p>;
  if (!restaurante) return <p>Restaurante não encontrado.</p>;

  return <PerfilRestaurante restaurante={restaurante} />;
}
