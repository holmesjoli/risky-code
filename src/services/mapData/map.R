library(osmdata)
library(magrittr)
library(tidyverse)
library(purrr)
library(tigris)
library(sf)
library(lwgeom)


bb <- getbb("Boston") %>%
  opq()

bb_rect <- data.frame(
  lat = c(getbb("Boston")[2], getbb("Boston")[4]),
  lon = c(getbb("Boston")[1], getbb("Boston")[3])
) %>% 
  st_as_sf(coords = c("lon", "lat"), crs = 4326) %>% 
  st_bbox() %>% 
  st_as_sfc()

highways <- bb %>%
  add_osm_feature(key = "highway", value = c("primary")) %>%
  osmdata_sf() %>%
  purrr::pluck("osm_lines") %>%
  sf::st_write("../../data/processed/Boston/highways.geojson", append = F)

park <- bb %>% 
  add_osm_feature(key = "leisure", value = c("park")) %>%
  osmdata_sf() %>% 
  purrr::pluck("osm_polygons") %>%
  sf::st_write("../../data/processed/Boston/park.geojson", append = F)

railroad <- bb %>% 
  add_osm_feature(key = "railway", value = c("crossing")) %>%
  osmdata_sf() %>% 
  purrr::pluck("osm_points") %>%
  sf::st_write("../../data/processed/Boston/railroad.geojson", append = F)

waterway <- bb %>% 
  add_osm_feature(key = "waterway", value = c("river")) %>%
  osmdata_sf() %>% 
  purrr::pluck("osm_lines") %>%
  sf::st_write("../../data/processed/Boston/waterways.geojson", append = F)

water <- bb %>% 
  add_osm_feature(key = "water", value = c("lake", "pond")) %>%
  osmdata_sf() %>% 
  purrr::pluck("osm_polygons") %>%
  sf::st_write("../../data/processed/Boston/water.geojson", append = F)

city <- bb %>% 
  add_osm_feature(key = "place", value = c("city")) %>%
  osmdata_sf() %>% 
  purrr::pluck("osm_multipolygons")  %>%
  sf::st_write("../../data/processed/Boston/city.json", append = F)

coastline <- bb %>% 
  add_osm_feature(key = 'natural', value = 'coastline') %>% 
  osmdata_sf() %>% 
  purrr::pluck("osm_lines")  %>%
  sf::st_write("../../data/processed/Boston/coastline.geojson", append = F)

cobblestone <- bb %>% 
  add_osm_feature(key = 'surface', value = c('cobblestone', 'unhewn_cobblestone')) %>% 
  osmdata_sf() %>% 
  purrr::pluck("osm_lines")

bb_rect_split <- bb_rect %>% 
  st_split(coastline) %>% 
  st_collection_extract("POLYGON")

land <- bb_rect_split[1]
sea  <- bb_rect_split[2]

ggplot() +
  geom_sf(
    data = land,
    fill = "bisque",
    color = NA
  ) + 
  geom_sf(
    data = sea,
    fill = "navy",
    color = NA
  ) 


ggplot() +
  geom_sf(data = city %>% filter(wikidata == "Q100"), aes(geometry = geometry)) +
  geom_sf(data = highways, aes(geometry = geometry)) +
  geom_sf(data = water, aes(geometry = geometry), fill="blue") +
  geom_sf(data = park, aes(geometry = geometry), fill="darkgreen") +
  geom_sf(data = coastline, aes(geometry = geometry))
