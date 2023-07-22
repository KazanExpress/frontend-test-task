import { MutationTree } from "vuex";
interface ModalsState {
  activeModal: boolean;
  currentModal: string;
}
enum MutationTypes {
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
}
interface Mutations extends MutationTree<ModalsState> {
  [MutationTypes.OPEN_MODAL](
    state: ModalsState,
    data: { active: boolean; name: string }
  ): void;
  [MutationTypes.CLOSE_MODAL](state: ModalsState): void;
}
const mutations: Mutations = {
  [MutationTypes.OPEN_MODAL](state, data) {
    state.activeModal = data.active;
    state.currentModal = data.name;
  },
  [MutationTypes.CLOSE_MODAL](state) {
    state.activeModal = false;
  },
};
export const modalsModule = {
  state: <ModalsState>{
    activeModal: false,
    currentModal: "",
  },
  getters: {
    getActiveModal(state: ModalsState): boolean {
      return state.activeModal;
    },
    getCurrentModal(state: ModalsState): string {
      return state.currentModal;
    },
  },
  mutations,
};
