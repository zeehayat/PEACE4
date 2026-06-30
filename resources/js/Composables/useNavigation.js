import { ref } from 'vue';

const isReportsHubOpen = ref(false);
const isCommandPaletteOpen = ref(false);

export function useNavigation() {
    return {
        isReportsHubOpen,
        isCommandPaletteOpen,
        toggleReportsHub: () => (isReportsHubOpen.value = !isReportsHubOpen.value),
        toggleCommandPalette: () => (isCommandPaletteOpen.value = !isCommandPaletteOpen.value),
    };
}
