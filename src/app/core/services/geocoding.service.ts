import { Injectable } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap, from } from 'rxjs';

interface GeocodingCache {
  [key: string]: {
    data: any;
    timestamp: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  // Cache para almacenar resultados de geocodificación
  private cache: GeocodingCache = {};
  private CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas
  private MI_API_KEY = 'apikey';

  private providers = [
    {
      name: 'OpenStreetMap',
      url: (lat: number, lng: number) =>
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      rateLimit: 1000, // 1 segundo entre solicitudes
    },
    {
      name: 'LocationIQ',
      url: (lat: number, lng: number) =>
        `https://us1.locationiq.com/v1/reverse.php?key=${this.MI_API_KEY}&lat=${lat}&lon=${lng}&format=json`,
      rateLimit: 1000,
    },
  ];

  private lastRequestTime: { [key: string]: number } = {};

  // Coordenadas por defecto
  async getLocationDetails(lat: number, lng: number): Promise<any> {
    const cacheKey = `${lat},${lng}`;

    // Verificar caché
    const cachedData = this.getFromCache(cacheKey);
    if (cachedData) return cachedData;

    // Intentar cada proveedor hasta obtener una respuesta
    for (const provider of this.providers) {
      try {
        await this.waitForRateLimit(provider.name);

        const response = await fetch(provider.url(lat, lng));
        const data = await response.json();

        this.setCache(cacheKey, data);
        this.lastRequestTime[provider.name] = Date.now();

        return data;
      } catch (error) {
        console.warn(`Error Con ${provider.name}:`, error);
        continue;
      }
    }

    throw new Error('No se pudo obtener la información de ubicación');
  }

  // Método para obtener la dirección a partir de caché
  private getFromCache(key: string): any | null {
    const cached = this.cache[key];
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > this.CACHE_DURATION) {
      delete this.cache[key];
      return null;
    }

    return cached.data;
  }

  // Método para almacenar en caché los resultados de geocodificación
  private setCache(key: string, data: any): void {
    this.cache[key] = {
      data,
      timestamp: Date.now(),
    };
  }

  // Método para esperar el tiempo de límite de tasa del proveedor
  private async waitForRateLimit(providerName: string): Promise<void> {
    const lastRequest = this.lastRequestTime[providerName] || 0;
    const provider = this.providers.find((p) => p.name === providerName)!;
    const timeSinceLastRequest = Date.now() - lastRequest;

    if (timeSinceLastRequest < provider.rateLimit) {
      await new Promise((resolve) =>
        setTimeout(resolve, provider.rateLimit - timeSinceLastRequest)
      );
    }
  }

  // Método para buscar direcciones
  async searchAddress(query: string): Promise<any[]> {
    if (!query.trim()) return [];

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}&countrycodes=pe&limit=5`;

    try {
      await this.waitForRateLimit('OpenStreetMap');
      const response = await fetch(url);
      const data = await response.json();
      return data.map((item: any) => ({
        display_name: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
      }));
    } catch (error) {
      console.error('Error searching address:', error);
      return [];
    }
  }

  // debounced para la búsqueda de direcciones
  createAddressSearchStream(searchInput: Subject<string>): Observable<any[]> {
    return searchInput.pipe(
      debounceTime(200), // tiempo de espera 200ms
      distinctUntilChanged(), /// solo emite si el valor ha cambiado
      switchMap((query) => from(this.searchAddress(query))) // realiza la búsqueda de direcciones
    );
  }
}
