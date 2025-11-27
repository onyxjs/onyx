import { Suite } from "./suite";

interface OnyxGlobalContext {
  suites: Suite[];
  currentSuite: Suite | null;
}
const onyxGlobalContext: OnyxGlobalContext = {
  suites: [],
  currentSuite: null,
};

export { onyxGlobalContext, type OnyxGlobalContext };
