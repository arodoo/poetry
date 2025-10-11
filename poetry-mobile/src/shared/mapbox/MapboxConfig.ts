/*
 * File: MapboxConfig.ts
 * Purpose: Mapbox initialization and configuration loader.
 * Sets access token from environment variables at app startup.
 * Must be called before any Mapbox components are rendered to
 * ensure proper authentication for map tiles and geocoding.
 * All Rights Reserved. Arodi Emmanuel
 */
import Mapbox from '@rnmapbox/maps'
import { getEnv } from '../config/env'

const env = getEnv()

export function initializeMapbox(): void {
  Mapbox.setAccessToken(env.mapboxAccessToken)
}
