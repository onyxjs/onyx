import { Suite } from "./suite";

interface OnyxGlobalContext {
  currentSuite: Suite | null;
}
const onyxGlobalContext: OnyxGlobalContext = {
  currentSuite: null,
};

export { onyxGlobalContext, type OnyxGlobalContext };
