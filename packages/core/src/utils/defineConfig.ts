interface OnyxConfigOptions {
  testDir?: string;
  rootDir?: string;
  timeoutMs?: number;
  bail?: boolean;
  includes?: string[];
  excludes?: string[];
}

function defineConfig(options: OnyxConfigOptions): OnyxConfigOptions {
  return options;
}

export { defineConfig, type OnyxConfigOptions };
