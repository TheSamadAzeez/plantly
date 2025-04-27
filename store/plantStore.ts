import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as FileSystem from 'expo-file-system';

// Define the structure for a plant in the application
// Each plant has a unique ID, name, watering frequency, and optional last watered timestamp
export type PlantType = {
  id: string;
  name: string;
  wateringFrequencyDays: number;
  lastWateredAtTimestamp?: number;
  imageUri?: string;
};

// Define the shape of the global plants state and its actions
// This type describes both the state data and the functions that can modify it
type PlantsState = {
  nextId: number; // Counter for generating unique plant IDs
  plants: PlantType[]; // Array of all plants
  addPlant: (
    name: string,
    wateringFrequencyDays: number,
    imageUri?: string
  ) => void; // Function to add a new plant
  removePlant: (plantId: string) => void; // Function to remove a plant
  waterPlant: (plantId: string) => void; // Function to mark a plant as watered
};

// Create and export the plant store with persistence
// This creates a global state store that persists data between app sessions
export const usePlantStore = create(
  persist<PlantsState>(
    (set) => ({
      plants: [], // Initialize empty plants array
      nextId: 1, // Initialize ID counter starting at 1

      // Add a new plant to the store
      // This function handles both plant data and optional image storage
      addPlant: async (
        name: string,
        wateringFrequencyDays: number,
        imageUri?: string
      ) => {
        // If an image is provided, save it to the app's document directory
        // Generate a unique filename using timestamp and original filename
        const savedImageUri =
          FileSystem.documentDirectory +
          `${new Date().getTime()}-${imageUri?.split('/').slice(-1)[0]}`;
        if (imageUri) {
          await FileSystem.copyAsync({
            from: imageUri,
            to: savedImageUri,
          });
        }

        // Update the store state with the new plant
        return set((state) => {
          return {
            ...state,
            nextId: state.nextId + 1, // Increment the ID counter for next plant
            plants: [
              {
                id: String(state.nextId),
                name,
                wateringFrequencyDays,
                imageUri: imageUri ? savedImageUri : undefined,
              },
              ...state.plants, // Add new plant at the beginning of the array
            ],
          };
        });
      },

      // Remove a plant from the store by its ID
      // This function filters out the plant with the matching ID
      removePlant: (plantId: string) => {
        return set((state) => {
          return {
            ...state,
            plants: state.plants.filter((plant) => plant.id !== plantId), // Remove plant by filtering array
          };
        });
      },

      // Update the last watered timestamp for a specific plant
      // This function marks when a plant was last watered
      waterPlant: (plantId: string) => {
        return set((state) => {
          return {
            ...state,
            plants: state.plants.map((plant) => {
              if (plant.id === plantId) {
                return {
                  ...plant,
                  lastWateredAtTimestamp: Date.now(), // Set current timestamp when plant is watered
                };
              }
              return plant;
            }),
          };
        });
      },
    }),
    {
      name: 'plantly-plants-store', // Unique name for the persisted store in AsyncStorage
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for data persistence
    }
  )
);
