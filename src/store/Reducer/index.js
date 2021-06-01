import { combineReducers } from "redux";

import coletaFrom from "./ColetaForm";
import user from "./User";
import SolicitaColeta from "./SolicitaColeta";
import MinhaColeta from "./MinhaColeta";
import UserModal from "./UserModal";

import CollectorColetas from "./CollectorColetas";
import CollectorMinhasColetas from "./CollectorMInhasColetas";

export default combineReducers({
  coletaFrom,
  user,
  SolicitaColeta,
  MinhaColeta,
  UserModal,
  CollectorColetas,
  CollectorMinhasColetas,
});
