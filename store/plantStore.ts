import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the structure for a plant in the application
type PlantType = {
  id: string;
  name: string;
  wateringFrequencyDays: number;
  lastWateredAtTimestamp?: number;
};

// Define the shape of the global plants state and its actions
type PlantsState = {
  nextId: number; // Counter for generating unique plant IDs
  plants: PlantType[]; // Array of all plants
  addPlant: (name: string, wateringFrequencyDays: number) => void; // Add a new plant
  removePlant: (plantId: string) => void; // Remove a plant
  waterPlant: (plantId: string) => void; // Mark a plant as watered
};

// Create and export the plant store with persistence
export const usePlantStore = create(
  persist<PlantsState>(
    (set) => ({
      plants: [], // Initialize empty plants array
      nextId: 1, // Initialize ID counter

      // Add a new plant to the store
      addPlant: (name: string, wateringFrequencyDays: number) => {
        return set((state) => {
          return {
            ...state,
            nextId: state.nextId + 1, // Increment the ID counter
            plants: [
              {
                id: String(state.nextId),
                name,
                wateringFrequencyDays,
              },
              ...state.plants, // Add new plant at the beginning of the array
            ],
          };
        });
      },

      // Remove a plant from the store by its ID
      removePlant: (plantId: string) => {
        return set((state) => {
          return {
            ...state,
            plants: state.plants.filter((plant) => plant.id !== plantId), // Filter out the plant to remove
          };
        });
      },

      // Update the last watered timestamp for a specific plant
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
      name: 'plantly-plants-store', // Name for the persisted store
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for persistence
    }
  )
);
